import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from 'src/typescript/interfaces/starwars-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CharactersDataService {
  characters: Character[];
  constructor(private http: HttpClient) {
    this.characters = [];
  }

  getCharacters() {
    return this.http.get<Character[]>('http://localhost:8080/characters');
  }
}
