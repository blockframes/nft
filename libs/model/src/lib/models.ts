export interface SignedMessage {
  message: string,
  signature: string,
  tokenId: number
}

export interface PlayerResponse {
  playerUrl: string;
  videoUrl: string;
}
