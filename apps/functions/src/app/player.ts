import { utils } from 'ethers';
import { SignedMessage } from '@nft/model';

export const checkSignature = async (data: SignedMessage): Promise<void> => {
  const { message, signature, tokenId } = data;

  const ethAddress = utils.verifyMessage(message, signature);
  console.log(`Ethereum address : ${ethAddress}`, `Token Id: ${tokenId}`);
  //@TODO check ownership against ETH contract
}