export interface IStarwarsEntity {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export interface ICharacter extends IStarwarsEntity {}

export interface IStarship extends IStarwarsEntity {}

export interface IDroid extends IStarwarsEntity {}
