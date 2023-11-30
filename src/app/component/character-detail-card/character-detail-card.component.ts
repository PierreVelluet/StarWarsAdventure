import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { StoreService } from 'src/app/services/globalState/store.service';
import { fadeInAnimation } from 'src/utils/angular-animations';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-character-detail-card',
  templateUrl: './character-detail-card.component.html',
  styleUrls: ['./character-detail-card.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    LazyLoadImageModule,
    CharacterDetailComponent,
  ],
  animations: [fadeInAnimation],
})
export class CharacterDetailCardComponent {
  public propertyArray: any[] = [];
  constructor(private storeService: StoreService) {
    storeService.sharedState$.subscribe((value) => {
      const arrayOfprops = Object.values(value.mainCharacter);
      arrayOfprops.forEach((el) => {
        if (Array.isArray(el))
          el?.map((charac) => {
            this.propertyArray.push(charac);
          });
        else this.propertyArray.push(el);
      });
    });
  }
}
