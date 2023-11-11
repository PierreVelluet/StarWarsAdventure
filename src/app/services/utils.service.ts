import { Injectable } from '@angular/core';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public trimString(text: string, maxLenght: number): string {
    if (text.length >= maxLenght) return text.slice(0, maxLenght) + '...';
    else return text;
  }

  public keepRandomObjects(
    count: number,
    arr: IStarwarsEntity[]
  ): IStarwarsEntity[] {
    let answer: IStarwarsEntity[] = [],
      counter = 0;

    while (counter < count) {
      let rand: IStarwarsEntity = arr[Math.floor(Math.random() * arr.length)];
      if (!answer.some((an) => an === rand)) {
        answer.push(rand);
        counter++;
      }
    }
    return answer;
  }
}
