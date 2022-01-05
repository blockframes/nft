import { Title } from '@nft/model/title';

export interface ERC1155_Event {
  TransferSingle: (operator: string, from: string, to: string, id: number, value: number) => void;
  TransferBatch: (operator: string, from: string, to: string, ids: number[], values: number[]) => void;
  ApprovalForAll: (owner: string, operator: string, approved: boolean) => void;
  URI: (value: string, id: number) => void;
}

export interface ERC1155_Token {
  id: number;
  account: string;
  balance: number;
  meta: Title;
}
