import { Component } from '@angular/core';
import { Character } from 'src/typescript/classes/starwars-interfaces';
import { CharactersDataService } from '../services/data/characters-data.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-choosing-panel',
  templateUrl: './choosing-panel.component.html',
  styleUrls: ['./choosing-panel.component.css'],
})
export class ChoosingPanelComponent {
  characters: Character[];

  constructor(
    private dataService: CharactersDataService,
    private utilsService: UtilsService
  ) {
    this.characters = [];
  }

  ngOnInit() {
    this.dataService.getCharacters().subscribe({
      next: (data: Character[]) => {
        this.characters = this.utilsService.keepRandomObjects(3, data);
        return this.characters;
      },
    });
  }
}
