
import { utils, ethers } from 'ethers';
import { ERC1155_Meta, SignedMessage } from '@nft/model';
import { createHash } from 'crypto';
import * as request from 'request-promise';

import env from '@nft/env';
import * as abi from '@nft/model/erc1155.json';
import { logger, https } from 'firebase-functions';

// No typing
const JWPlayerApi = require('jwplatform');

// This variable define the duration (in seconds) of a video link before it expires
export const linkDuration = 60 * 60 * 5; // 5 hours in seconds = 60 seconds * 60 minutes * 5 = 18 000 seconds


export const checkSignature = async (data: SignedMessage, context: https.CallableContext): Promise<string> => {
  const { message, signature, tokenId } = data;
  const ethAddress = utils.verifyMessage(message, signature);
  logger.log(`Ethereum address : ${ethAddress}`, `Token Id: ${tokenId}`);

  const provider = ethers.getDefaultProvider(env.eth.network);
  const contract = new ethers.Contract(env.eth.erc1155, abi, provider);

  const [balance, uri] = await Promise.all([
    contract.balanceOf(ethAddress, tokenId),
    contract.uri(tokenId),
  ]);

  const amount: number = balance.toNumber();
  if (amount === 0) {
    throw new https.HttpsError('permission-denied', `${ethAddress} does not own token : ${tokenId}`);
  }

  const options = {
    method: 'GET',
    url: uri,
    json: true,
    headers: { 'User-Agent': 'client' },
  };
  const meta: ERC1155_Meta = await request.get(options);

  // Check country
  const req = context.rawRequest;
  const engineCountry = req.headers['x-appengine-country'];
  if (engineCountry && typeof engineCountry === 'string') {
    const attribute = meta.attributes.find(attr => attr.trait_type === 'countries');
    if (attribute) {
      const countries = attribute.value.split(',').map(country => country.trim().toLowerCase());
      const country = engineCountry.trim().toLowerCase();
      if (!countries.includes(country)) {
        throw new https.HttpsError('permission-denied', 'Title not available in your country.');
      }
    }
  }


  // TODO: Get jwplayerUrl

  return 'https://foo.bar.com';
}

export const getPlayerUrl = async (
  data: unknown,
  context: https.CallableContext
): Promise<string> => {

  // const { jwplayerSecret } = config().jwplayer;
  const jwplayerSecret = 'aaaaaaaaaaaaa';

  if (!jwplayerSecret) {
    throw new Error(`jwplayer.jwplayerSecret env variable hasn't been set ! Check functions config in CLI with 'firebase functions:config:get'!`);
  }

  const expires = Math.floor(new Date().getTime() / 1000) + linkDuration; // now + 5 hours

  const toSign = `libraries/3sZQvkmL.js:${expires}:${jwplayerSecret}`;
  const md5 = createHash('md5');

  const signature = md5.update(toSign).digest('hex');

  const signedUrl = `https://cdn.jwplayer.com/libraries/lpkRdflk.js?exp=${expires}&sig=${signature}`;
  return signedUrl;
};
