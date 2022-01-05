
interface OpenSeaStringAttribute {
  trait_type: string;
  value: string;
};

interface TitleAttribute extends OpenSeaStringAttribute {
  trait_type: 'Title',
};

type Attribute = TitleAttribute;

export interface Title {
  attributes?: Attribute[];
  description: string;
  image: string;
  jwPlayerId?: string;
  name: string;
  animation_url?: string;
  background_color?: string;
};
