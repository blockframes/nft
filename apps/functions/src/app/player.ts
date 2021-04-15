import { utils, ethers } from 'ethers';
import { ERC1155_Meta, SignedMessage } from '@nft/model';
import env from '@nft/env';
import * as abi from '@nft/model/erc1155.json';
import * as request from "request-promise";
import { logger, https } from 'firebase-functions';

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
  if (amount === 0) throw new https.HttpsError('permission-denied', `${ethAddress} does not own token : ${tokenId}`);

  const options = {
    method: 'GET',
    url: uri,
    json: true,
    headers: { 'User-Agent': 'client' },
  };
  const meta: ERC1155_Meta = await request.get(options);

  // TODO: Check country
  const req = context.rawRequest;
  const country = req.headers['x-appengine-country'];
  const city = req.headers['x-appengine-city'];

  // TODO: Get jwplayerUrl

  return 'https://foo.bar.com';
}

