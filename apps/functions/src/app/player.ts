
import { createHash } from 'crypto';
import { logger, https, config } from 'firebase-functions';
import { utils, getDefaultProvider, Contract } from 'ethers';

import env from '@nft/env';
import * as abi from '@nft/model/erc1155.json';
import { Title } from '@nft/model/title';
import { SignedMessage, PlayerResponse } from '@nft/model/models';

import { db } from './internals/firebase';

// This variable define the duration (in seconds) of a video link before it expires
export const linkDuration = 60 * 60 * 5; // 5 hours in seconds = 60 seconds * 60 minutes * 5 = 18 000 seconds
export const oneDay = 1000 * 60 * 60 * 24; // one day in milliseconds = 1000 milliseconds * 60 seconds * 60 minutes * 24 hours = 86 400 000 milliseconds


export const checkSignature = async (data: SignedMessage): Promise<PlayerResponse> => {

  // ------------------------------
  // CHECK PRECONDITIONS

  const jwplayerSecret = config().jwplayer?.secret;
  const jwplayerLibId = config().jwplayer?.library;

  if (!jwplayerSecret) {
    logger.error(`JWP CONFIG NOT SET: jwplayer.secret env variable hasn't been set ! Check functions config in CLI with 'firebase functions:config:get'!`);
    throw new https.HttpsError('internal', `Sorry something went wrong, please contact us! (code: fn-bad-config)`);
  }

  if (!jwplayerLibId) {
    logger.error(`JWP CONFIG NOT SET: jwplayer.library env variable hasn't been set ! Check functions config in CLI with 'firebase functions:config:get'!`);
    throw new https.HttpsError('internal', `Sorry something went wrong, please contact us! (code: fn-bad-config)`);
  }

  // ------------------------------
  // COMPUTE PLAYER URL

  const expires = Math.floor(new Date().getTime() / 1000) + linkDuration; // now + 5 hours

  const toSign = `libraries/${jwplayerLibId}.js:${expires}:${jwplayerSecret}`;
  const md5 = createHash('md5');

  const playerSignature = md5.update(toSign).digest('hex');

  const playerUrl = `https://cdn.jwplayer.com/libraries/${jwplayerLibId}.js?exp=${expires}&sig=${playerSignature}`;


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
  // RETRIEVE TOKEN METADATA

  const metaSnap = await db.ref('titles').child(`${tokenId}`).get();
  if (!metaSnap.exists()) {
    logger.error(`METADATA NOT FOUND: ${ethAddress} is the legit owner of token ${tokenId}, but this token as no metadata in our RealTime DB !!!!`);
    throw new https.HttpsError('internal', `You (${ethAddress}) own this token (${tokenId}), but we haven't found its data in our servers. Please contact us!  (code: db-missing-meta)`);
  }
  const meta: Title = metaSnap.val();

  if (!meta.jwPlayerId) {
    throw new https.HttpsError('not-found', `This token don't have any private video! (code: no-priv-vid)`);
  }

  // ------------------------------
  // COMPUTE VIDEO URL
  const toSignManifest = `manifests/${meta.jwPlayerId}.m3u8:${expires}:${jwplayerSecret}`;

  const hash = createHash('md5');
  const videoSignature = hash.update(toSignManifest).digest('hex');
  const videoUrl = `https://cdn.jwplayer.com/manifests/${meta.jwPlayerId}.m3u8?exp=${expires}&sig=${videoSignature}`;


  // ------------------------------
  // RETURN NEEDED DATA

  return {
    playerUrl,
    videoUrl,
    jwPlayerId: meta.jwPlayerId,
  };
}
