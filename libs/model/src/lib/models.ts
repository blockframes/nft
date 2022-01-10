import { Title } from '@nft/model/title';

export interface SignedMessage {
  message: string,
  signature: string,
  tokenId: number
}

export interface PlayerResponse {
  playerUrl: string;
  videoUrl: string;
  jwPlayerId: string;
}


export interface StoreMetadataParams {
  message: string,
  signature: string,
  title: Title
}
