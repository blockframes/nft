import { utils, ethers } from 'ethers';
import { SignedMessage } from '@nft/model';
import env from '@nft/env';
import * as abi from '@nft/model/erc1155.json';
import * as request from "request-promise";

export const checkSignature = async (data: SignedMessage): Promise<string> => {
  const { message, signature, tokenId } = data;
  const ethAddress = utils.verifyMessage(message, signature);
  console.log(`Ethereum address : ${ethAddress}`, `Token Id: ${tokenId}`);

  const provider = ethers.getDefaultProvider(env.eth.network);
  const contract = new ethers.Contract(env.eth.erc1155, abi, provider);

  const balance: ethers.BigNumberish = await contract.balanceOf(ethAddress, tokenId);

  if (balance > 0) {
    const titleId = utils.formatEther(balance);
    const options = {
      method: 'GET',
      url: `https://c8-nft-default-rtdb.europe-west1.firebasedatabase.app/titles/${titleId}.json`,
      json: true,
      headers: { 'User-Agent': 'client' },
    };
    const title = await request.get(options);
    console.log(title);

    return 'https://foo.bar.com';
  } else {
    throw new Error(`${ethAddress} does not own token : ${tokenId}`);
  }

}