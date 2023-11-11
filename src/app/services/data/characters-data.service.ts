import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICharacter } from 'src/typescript/interfaces/starwars-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CharactersDataService {
  characters: ICharacter[];
  constructor(private http: HttpClient) {
    this.characters = [];
  }

  getStarwarsEntites(entityType: string) {
    return this.http.get<ICharacter[]>(
      `http://localhost:8080/api/entity/${entityType}`
    );
  }
}
