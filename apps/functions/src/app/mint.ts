
import { https, logger } from 'firebase-functions';
import { Contract, getDefaultProvider, utils } from 'ethers';

import env from '@nft/env';
import * as abi from '@nft/model/erc1155.json';
import { StoreMetadataParams } from '@nft/model/models';

import { db } from './internals/firebase';

export const saveTokenMetadata = async (data: StoreMetadataParams) => {

  // ------------------------------
  // CHECK PRECONDITIONS

  const { title, message, signature } = data;

  if (!title) {
    throw new https.HttpsError('failed-precondition', `Missing "title" parameter!`);
  }
  if (!message) {
    throw new https.HttpsError('failed-precondition', `Missing "message" parameter!`);
  }
  if (!signature) {
    throw new https.HttpsError('failed-precondition', `Missing "signature" parameter!`);
  }

  // ------------------------------
  // CHECK SIGNATURE & VERIFY ROLE

  const ethAddress = utils.verifyMessage(message, signature);

  const provider = getDefaultProvider(env.eth.network);
  const contract = new Contract(env.eth.erc1155, abi, provider);

  const minterRole = await contract.MINTER_ROLE();

  const authorized = await contract.hasRole(minterRole, ethAddress);

  if (!authorized) {
    throw new https.HttpsError('permission-denied', `You (${ethAddress}) are not authorized to mint!`);
  }


  // ------------------------------
  //      SAVE METADATA IN DB

  const lastIdRef = db.ref('store').child('lastId');
  const lastIdSnap = await lastIdRef.get();
  const lastId = lastIdSnap.val();
  const hasLastId = lastIdSnap.exists();

  const nextId = hasLastId ? lastId + 1 : 0;

  const tokenRef = db.ref('titles').child(nextId);
  const tokenSnap = await tokenRef.get();
  const alreadyExist = tokenSnap.exists();

  if (alreadyExist) {
    const errorMessage = `Next Token ID should be #${nextId}, but a token with this ID already exist! Please check "store/lastId" in the DB.`;
    logger.error(errorMessage);
    throw new https.HttpsError('internal', errorMessage);
  }

  await lastIdRef.set(nextId);
  await tokenRef.update(title);

  return nextId as number;
}
