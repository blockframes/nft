
import { utils, getDefaultProvider, Contract, BigNumber } from 'ethers';

import { sign } from 'jsonwebtoken';
import { createHash } from 'crypto';
import * as admin from 'firebase-admin';
import { logger, https, config } from 'firebase-functions';

import env from '@nft/env';
import * as abi from '@nft/model/erc1155.json';
import { ERC1155_Meta, SignedMessage, PlayerResponse, TokenLimit } from '@nft/model';
import { id } from '@ethersproject/hash';

// This variable define the duration (in seconds) of a video link before it expires
export const linkDuration = 60 * 60 * 5; // 5 hours in seconds = 60 seconds * 60 minutes * 5 = 18 000 seconds
export const oneDay = 1000 * 60 * 60 * 24; // one day in milliseconds = 1000 milliseconds * 60 seconds * 60 minutes * 24 hours = 86 400 000 milliseconds

export const MAX_PLAY_COUNT = 10;

/** Admin instance of the RealTime Database */
export const app = admin.initializeApp();
export const db = app.database();

export const checkSignature = async (data: SignedMessage, context: https.CallableContext): Promise<PlayerResponse> => {

  // ------------------------------
  // CHECK PRECONDITIONS

  const jwplayerSecret = config().jwplayer?.secret;

  if (!jwplayerSecret) {
    logger.error(`JWP CONFIG NOT SET: jwplayer.secret env variable hasn't been set ! Check functions config in CLI with 'firebase functions:config:get'!`);
    throw new https.HttpsError('internal', `Sorry something !`);
  }

  // ------------------------------
  // COMPUTE PLAYER URL

  const expires = Math.floor(new Date().getTime() / 1000) + linkDuration; // now + 5 hours

  const toSign = `libraries/3sZQvkmL.js:${expires}:${jwplayerSecret}`;
  const md5 = createHash('md5');

  const playerSignature = md5.update(toSign).digest('hex');

  const playerUrl = `https://cdn.jwplayer.com/libraries/3sZQvkmL.js?exp=${expires}&sig=${playerSignature}`;


  // ------------------------------
  // VERIFY OWNERSHIP OF THE TOKEN

  const { message, signature, tokenId } = data;
  const ethAddress = utils.verifyMessage(message, signature);

  const provider = getDefaultProvider(env.eth.network);
  const contract = new Contract(env.eth.erc1155, abi, provider);

  const balance = await contract.balanceOf(ethAddress, tokenId);

  const amount: number = balance.toNumber();
  if (amount === 0) {
    throw new https.HttpsError('permission-denied', `${ethAddress} does not own token : ${tokenId}`);
  }


  // ------------------------------
  // VERIFY TOKEN SALES CONDITIONS

  const erc1155 = new Contract(env.eth.erc1155, abi, provider);
  const filter = erc1155.filters.TransferSingle(null, null, ethAddress);
  const events = await erc1155.queryFilter(filter);
  const transferEvent = events.find(event => (event.args!.id as BigNumber).toNumber() === tokenId);
  const tx = await transferEvent?.getTransactionReceipt();

  // if the token has been sold through OpenSea the transaction should contain an
  // `OrdersMatch` event from the OpenSea crowd sales contract
  const ordersMatchTopic = id('OrdersMatched(bytes32,bytes32,address,address,uint256,bytes32)');
  const containOrderMatch = tx?.logs.some(log => log.topics[0] === ordersMatchTopic);

  if (!containOrderMatch) {
    logger.error(`ILLEGAL TOKEN OWNERSHIP: owner: ${ethAddress}, token id: ${tokenId}, tx hash: ${tx?.transactionHash}`);
    throw new https.HttpsError('permission-denied', `You (${ethAddress}) are the owner of the token (${tokenId}) but it seems that it has been acquired in an illegal way!`);
  }


  // ------------------------------
  // CHECK TOKEN LIMITS

  const limitsRef = db.ref('owners').child(ethAddress).child(`${tokenId}`);
  const limitsSnap = await limitsRef.get();
  const now = Date.now();
  if (!limitsSnap.exists()) {
    // create new limits in case this user just acquired the token and watch the movie for the first time
    await limitsRef.set({ lastView: now, playCount: 1 } as TokenLimit);
  } else {
    const limits: TokenLimit = limitsSnap.val();
    const dateThreshold = limits.lastView + oneDay;
    if (now > dateThreshold) {
      if (limits.playCount >= MAX_PLAY_COUNT) {
        throw new https.HttpsError('permission-denied', `You already have seen this movie ${MAX_PLAY_COUNT} times!`);
      }
      limits.lastView = now;
      limits.playCount += 1;
      await limitsRef.set(limits);
    }
  }


  // ------------------------------
  // RETRIEVE TOKEN METADATA

  const metaSnap = await db.ref('titles').child(`${tokenId}`).get();
  if (!metaSnap.exists()) {
    logger.error(`METADATA NOT FOUND: ${ethAddress} is the legit owner of token ${tokenId}, but this token as no metadata in our RealTime DB !!!!`);
    throw new https.HttpsError('internal', `You (${ethAddress}) own this token (${tokenId}), but we haven't found its data in our servers. Please contact us!`);
  }
  const meta: ERC1155_Meta = metaSnap.val();


  // ------------------------------
  // CHECK USER COUNTRY AGAINST TOKEN ALLOWED COUNTRIES

  const req = context.rawRequest;
  const engineCountry = req.headers['x-appengine-country'];
  if (engineCountry && typeof engineCountry === 'string') {
    const attribute = meta.attributes?.find(attr => attr.trait_type === 'countries');
    if (attribute) {
      const countries = attribute.value.split(',').map(country => country.trim().toLowerCase());
      const country = engineCountry.trim().toLowerCase();
      if (!countries.includes(country)) {
        throw new https.HttpsError('permission-denied', 'Title not available in your country.');
      }
    }
  }


  // ------------------------------
  // COMPUTE VIDEO URL

  const resource = `/v2/media/${meta.jwPlayerId}/drm/lDDldMGd`;

  const jwt = sign({
    resource,
    exp: expires
  }, jwplayerSecret);

  const videoUrl = `https://cdn.jwplayer.com${resource}?token=${jwt}`;


  // ------------------------------
  // RETURN NEEDED DATA

  return {
    playerUrl,
    videoUrl,
    jwPlayerId: meta.jwPlayerId,
  };
}
