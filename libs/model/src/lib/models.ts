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

export interface TokenLimit {
  /** Unix timestamp of the date when the last view occurred */
  lastView: number;
  /** Number of times this owner has viewed this token's movie */
  playCount: number;
}
