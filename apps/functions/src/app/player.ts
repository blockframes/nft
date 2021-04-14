import { utils } from 'ethers';

export const checkSignature = async (data: { message: string, signature: string, tokenId: string }): Promise<string> => {
  const { message, signature, tokenId } = data;

  const ethAddress = utils.verifyMessage(message, signature);
  console.log(`Ethereum address : ${ethAddress}`, `Token Id: ${tokenId}`);
  //@TODO check ownership against ETH contract

  return 'https://foo.bar.com';
}