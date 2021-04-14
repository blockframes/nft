export interface SignedMessage {
  message: string,
  signature: string,
  tokenId: string
}

export function createSignedMessage(signedMessage: Partial<SignedMessage>): SignedMessage {
  return {
    message: '',
    signature: '',
    tokenId: '',
    ...signedMessage
  }
}