import { Injectable } from '@angular/core';
import {
  Character,
  Starship,
} from 'src/typescript/classes/starwars-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public trimString(text: string, maxLenght: number): string {
    if (text.length >= maxLenght) return text.slice(0, maxLenght) + '...';
    else return text;
  }

  public keepRandomObjects(count: number, arr: Character[] | Starship[]) {
    let answer: Character[] = [],
      counter = 0;

    while (counter < count) {
      let rand = arr[Math.floor(Math.random() * arr.length)];
      if (!answer.some((an) => an === rand)) {
        answer.push(rand);
        counter++;
      }
    }

    return answer;
  }
}
