import { Component } from '@angular/core';
import { StarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';
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
  objs: StarwarsEntity[];

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
      next: (data: StarwarsEntity[]) => {
        this.objs = this.utilsService.keepRandomObjects(3, data);
        return this.objs;
      },
    });
  }

  chosenObjectHandler(obj: StarwarsEntity) {
    const newState = {
      ...this.state,
      [this.state.gameStep.associatedStarwarsEntity]: obj,
    };
    this.globalStateService.setState(newState);
  }
}
