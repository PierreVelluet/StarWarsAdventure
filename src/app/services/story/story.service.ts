import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  fr from "../../../assets/i18n/fr.json"
import { TranslateService } from '@ngx-translate/core';
import { IStory } from 'src/typescript/interfaces/general-interfaces';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private stories?: IStory[];
  constructor(private http: HttpClient, private translate: TranslateService) {
   console.log(fr.STORIES)
  }
  getStoryById(id: number):IStory {
    return fr.STORIES.filter((x:IStory) => x.id == id)?.[0]
  }
}
