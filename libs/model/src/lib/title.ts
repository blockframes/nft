export interface Attribute {
  ['key']: string,
}

export interface Title {
  attributes: Attribute;
  description: string;
  image: string;
  jwPlayerId: string;
  name: string;
}
