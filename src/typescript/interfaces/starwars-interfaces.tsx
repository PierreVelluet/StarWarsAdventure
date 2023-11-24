export interface IStarwarsEntity {
  _id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  delay?: string;
}

export interface ICharacter extends IStarwarsEntity {}

export interface IDroid extends IStarwarsEntity {}

export interface IVehicle extends IStarwarsEntity {}

export interface ILocation extends IStarwarsEntity {}
