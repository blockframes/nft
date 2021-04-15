
export interface ERC1155_Event {
  TransferSingle: (operator: string, from: string, to: string, id: number, value: number) => void;
  TransferBatch: (operator: string, from: string, to: string, ids: number[], values: number[]) => void;
  ApprovalForAll: (owner: string, operator: string, approved: boolean) => void;
  URI: (value: string, id: number) => void;
}

export interface ERC1155_Meta {
  name: string;
  description: string;
  image: string;
  image_data?: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  attributes: { display_type?: string, trait_type: string, value: string }[];
}

export interface ERC1155_Token {
  id: number;
  account: string;
  balance: number;
  meta: ERC1155_Meta;
}