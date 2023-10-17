export interface StarwarsEntity {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export interface Character extends StarwarsEntity {}

export interface Starship extends StarwarsEntity {}

export interface Droid extends StarwarsEntity {}
