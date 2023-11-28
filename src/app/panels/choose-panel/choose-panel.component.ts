import { Component } from '@angular/core';

import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';
import { IGameStep } from 'src/typescript/interfaces/general-interfaces';
import { LoadingStateService } from 'src/app/services/globalState/loading-state.service';
import { SteppingDirection, StepType } from 'src/typescript/enums';

import { CharactersDataService } from '../../services/data/characters-data.service';
import { UtilsService } from '../../services/utils.service';
import { StoreService } from '../../services/globalState/store.service';

@Component({
  selector: 'app-choose-panel',
  templateUrl: './choose-panel.component.html',
  styleUrls: ['./choose-panel.component.css'],
})
export class ChoosingPanelComponent {
  objs: IStarwarsEntity[] | any = [];
  public currentStep!: IGameStep;
  private stepIsChoosingType: boolean = false;
  public numberOfReroll: number = 0;
  public isLoading: boolean = false;
  public isClickPrevented: boolean = true;

  constructor(
    private globalStateService: StoreService,
    private dataService: CharactersDataService,
    private utilsService: UtilsService,
    private loadingStateService: LoadingStateService
  ) {
    this.loadingStateService.loadingObs$.subscribe((value) => {
      this.isLoading = value;
    });
    this.globalStateService.sharedState$.subscribe((value) => {
      this.currentStep = value.currentGameStep;
      this.stepIsChoosingType = value.currentGameStep.currentStepType == StepType.Choice;
      this.numberOfReroll = value?.currentGameStep?.numberOfReroll ?? 0;
    });
  }

  ngOnInit(): void {
    this.getStarwarsEntitesByStep();
  }

  fetchAndAssignEntities(reroll: boolean = false) {
    this.isClickPrevented = true;
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
        complete: () => {
          this.globalStateService.updateEntitiesPreviouslyFetched(
            this.objs,
            reroll
          );
          this.allowClicksActionsAfterDelay();
        },
      });
  }

  getStarwarsEntitesByStep(): void {
    if (!this.stepIsChoosingType) return;

    if (this.globalStateService.isEntitiesAlreadyFetched()) {
      this.objs = this.currentStep.entitiesPreviouslyFetched;
      this.allowClicksActionsAfterDelay();
      return;
    }

    this.fetchAndAssignEntities();
  }

  allowClicksActionsAfterDelay() {
    // Prevent the element to be clicked until the animation end.
    setTimeout(() => {
      this.isClickPrevented = false;
    }, 1500);
  }

  // Add the delay key based on the index, to the entity to display.
  addDelayKeyToEntity(el: IStarwarsEntity, index: number): IStarwarsEntity {
    return {
      ...el,
      delay: `animate__delay-${index}s`,
    };
  }

  chooseActionHandler(starwarsEntity: IStarwarsEntity) {
    if (!this.stepIsChoosingType) return;

    this.globalStateService.updateStateWithParams(
      this.currentStep.associatedStarwarsEntity,
      starwarsEntity,
      SteppingDirection.Forward
    );

    this.getStarwarsEntitesByStep();
  }

  rerollActionHandler() {
    this.fetchAndAssignEntities(true);
  }
}
