import { Component } from '@angular/core';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

import { CharactersDataService } from '../services/data/characters-data.service';
import { UtilsService } from '../services/utils.service';
import { GlobalStateService } from '../services/globalState/global-state.service';

@Component({
  selector: 'app-choosing-panel',
  templateUrl: './choosing-panel.component.html',
  styleUrls: ['./choosing-panel.component.css'],
})
export class ChoosingPanelComponent {
  public state: any;
  objs: IStarwarsEntity[];

  constructor(
    private globalStateService: GlobalStateService,
    private dataService: CharactersDataService,
    private utilsService: UtilsService
  ) {
    this.objs = [];
  }

  ngOnInit() {
    this.state = this.globalStateService.getState();

    this.dataService.getCharacters().subscribe({
      next: (data: IStarwarsEntity[]) => {
        this.objs = this.utilsService.keepRandomObjects(3, data);
        return this.objs;
      },
    });
  }

  chosenObjectHandler(obj: IStarwarsEntity) {
    this.globalStateService.setStateWithStarwasEntity(obj);
  }
}
