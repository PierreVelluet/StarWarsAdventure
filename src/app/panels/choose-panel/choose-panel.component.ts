import { Component } from '@angular/core';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

import { IGameStep } from 'src/typescript/interfaces/general-interfaces';

import { CharactersDataService } from '../../services/data/characters-data.service';
import { UtilsService } from '../../services/utils.service';
import { StoreService } from '../../services/globalState/store.service';
import { SteppingDirection, StepType } from 'src/typescript/enums';

@Component({
  selector: 'app-choose-panel',
  templateUrl: './choose-panel.component.html',
  styleUrls: ['./choose-panel.component.css'],
})
export class ChoosingPanelComponent {
  public generalState: any;
  objs: any[];
  public currentStep!: IGameStep;
  private stepIsChoosingType: boolean = false;

  constructor(
    private globalStateService: StoreService,
    private dataService: CharactersDataService,
    private utilsService: UtilsService
  ) {
    this.objs = [];
    this.generalState = this.globalStateService.getState();
    this.globalStateService.sharedState$.subscribe((value) => {
      this.currentStep = value.currentGameStep;
      this.stepIsChoosingType = value.currentGameStep.type == StepType.Choice;
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
          this.objs = this.utilsService
            .keepRandomObjects(3, data)
            .map((el: IStarwarsEntity, index: number) => {
              return this.addDelayKeyToEntity(el, index);
            });
        },
      });
  }

  // Add the delay key based on the index, to the entity to display.
  addDelayKeyToEntity(el: IStarwarsEntity, index: number): IStarwarsEntity {
    return {
      ...el,
      delay: `animate__delay-${index}s`,
    };
  }

  chosenObjectHandler(starwarsEntity: IStarwarsEntity) {
    if (!this.stepIsChoosingType) return;

    this.globalStateService.updateStateWithParams(
      this.currentStep.associatedStarwarsEntity,
      starwarsEntity,
      SteppingDirection.Forward
    );

    this.getStarwarsEntitesByStep();
  }
}
