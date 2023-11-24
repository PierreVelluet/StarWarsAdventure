import { Component } from '@angular/core';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

import { CharactersDataService } from '../../services/data/characters-data.service';
import { UtilsService } from '../../services/utils.service';
import { GlobalStateService } from '../../services/globalState/global-state.service';
import { IGameStep } from 'src/typescript/interfaces/state-interface';
import { Subscription } from 'rxjs';
import { LoadingStateService } from 'src/app/services/globalState/loading-state.service';

@Component({
  selector: 'app-choosing-panel',
  templateUrl: './choosing-panel.component.html',
  styleUrls: ['./choosing-panel.component.css'],
})
export class ChoosingPanelComponent {
  public generalState: any;
  objs: IStarwarsEntity[];
  public currentStep!: IGameStep;
  private _gameStep_subscription: Subscription;

  constructor(
    private globalStateService: GlobalStateService,
    private dataService: CharactersDataService,
    private utilsService: UtilsService,
    private loadingStateService: LoadingStateService
  ) {
    this.objs = [];
    this.generalState = this.globalStateService.getGeneralState();
    this._gameStep_subscription =
      this.globalStateService.globalSharedState$.subscribe((value) => {
        this.currentStep = value.gameStep;
      });
  }

  ngOnInit() {
    this.getStarwarsEntitesByStep();
  }

  getStarwarsEntitesByStep(): void {
    if (!this.currentStep) return;

    this.dataService
      .getStarwarsEntites(this.currentStep.associatedStarwarsEntity + 's')
      .subscribe({
        next: (data: IStarwarsEntity[]) => {
          this.objs = this.utilsService.keepRandomObjects(3, data);
          return this.objs;
        },
      });
  }

  chosenObjectHandler(starwarsEntity: IStarwarsEntity) {
    if (!this.currentStep) return;

    this.globalStateService.updateEntityAndMoveNextStep(
      this.currentStep.associatedStarwarsEntity,
      starwarsEntity
    );
    if (!this.currentStep.associatedStarwarsEntity) return;

    this.getStarwarsEntitesByStep();
  }
}
