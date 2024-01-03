import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IStarwarsEntity,
} from 'src/typescript/interfaces/starwars-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CharactersDataService {
  constructor(private http: HttpClient) {
  }

  getStarwarsEntites(entityType: string): Observable<IStarwarsEntity[]> {
    return this.http.get<IStarwarsEntity[]>(
      `http://localhost:8080/api/entity/${entityType}`
    );
  }
}
