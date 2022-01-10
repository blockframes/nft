
interface OpenSeaStringAttribute {
  trait_type: string;
  value: string;
};

interface TitleAttribute extends OpenSeaStringAttribute {
  trait_type: 'Title',
};

type Attribute = TitleAttribute;

export interface Title {
  // properties visible on open-sea
  attributes?: Attribute[];
  description?: string;
  image: string;
  name: string;
  animation_url?: string;
  background_color?: string;

  // custom properties, only for our app
  jwPlayerId?: string;
  author: string;
};
