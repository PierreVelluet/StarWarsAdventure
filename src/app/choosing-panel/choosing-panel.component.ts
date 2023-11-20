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
  public generalState: any;
  objs: IStarwarsEntity[];

  constructor(
    private globalStateService: GlobalStateService,
    private dataService: CharactersDataService,
    private utilsService: UtilsService
  ) {
    this.objs = [];
    this.generalState = this.globalStateService.getGeneralState();
  }

  ngOnInit() {
    this.getStarwarsEntitesByStep();
  }

  getStarwarsEntitesByStep(): void {
    this.dataService
      .getStarwarsEntites(
        this.globalStateService.getGeneralState().gameStep
          .associatedStarwarsEntity + 's'
      )
      .subscribe({
        next: (data: IStarwarsEntity[]) => {
          this.objs = this.utilsService.keepRandomObjects(3, data);
          return this.objs;
        },
      });
  }

  chosenObjectHandler(starwarsEntity: IStarwarsEntity) {
    this.globalStateService.updateGeneralState(
      this.globalStateService.getGeneralState().gameStep
        .associatedStarwarsEntity,
      starwarsEntity,
      true
    );
    this.getStarwarsEntitesByStep();
  }
}
