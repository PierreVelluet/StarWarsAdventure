import { Component } from '@angular/core';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

import { IGameStep } from 'src/typescript/interfaces/state-interface';

import { CharactersDataService } from '../../services/data/characters-data.service';
import { UtilsService } from '../../services/utils.service';
import { GlobalStateService } from '../../services/globalState/global-state.service';
import { StepType } from 'src/typescript/enums';

@Component({
  selector: 'app-choosing-panel',
  templateUrl: './choosing-panel.component.html',
  styleUrls: ['./choosing-panel.component.css'],
})
export class ChoosingPanelComponent {
  public generalState: any;
  objs: IStarwarsEntity[];
  public currentStep!: IGameStep;
  private stepIsChoosingType: boolean = false;

  constructor(
    private globalStateService: GlobalStateService,
    private dataService: CharactersDataService,
    private utilsService: UtilsService
  ) {
    this.objs = [];
    this.generalState = this.globalStateService.getGeneralState();
    this.globalStateService.globalSharedState$.subscribe((value) => {
      this.currentStep = value.gameStep;
      this.stepIsChoosingType = value.gameStep.type == StepType.Choice;
    });
  }

  ngOnInit(): void {
    this.getStarwarsEntitesByStep();
  }

  getStarwarsEntitesByStep(): void {
    if (!this.stepIsChoosingType) return;

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
    if (!this.stepIsChoosingType) return;

    this.globalStateService.updateEntityAndMoveNextStep(
      this.currentStep.associatedStarwarsEntity,
      starwarsEntity
    );

    this.getStarwarsEntitesByStep();
  }
}
