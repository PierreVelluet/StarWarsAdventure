import { Component } from '@angular/core';

import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';
import { IGameStep } from 'src/typescript/interfaces/general-interfaces';
import { LoadingStateService } from 'src/app/services/globalState/loading-state.service';
import { SteppingDirection } from 'src/typescript/enums';
import { choosingCardsListAnimation } from 'src/utils/angular-animations';

import { CharactersDataService } from '../../services/data/characters-data.service';
import { UtilsService } from '../../services/utils.service';
import { StoreService } from '../../services/globalState/store.service';
import { environment } from 'src/environments/environment';

import { characterDummydata } from "../../../utils/staticDatas"

@Component({
  selector: 'app-choose-panel',
  templateUrl: './choose-panel.component.html',
  styleUrls: ['./choose-panel.component.css'],
  animations: [choosingCardsListAnimation],
})
export class ChoosingPanelComponent {
  objs: IStarwarsEntity[] | any = [];
  public currentStep!: IGameStep;
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
      this.numberOfReroll = value?.currentGameStep?.numberOfReroll ?? 0;
    });
  }

  ngOnInit(): void {
    this.getStarwarsEntites();
  }

  allowClicksActionsAfterDelay() {
    // Permit the cards to be clicked again after the delayed animation
    setTimeout(() => {
      this.isClickPrevented = false;
    }, 1500);
  }

  getStarwarsEntites(reroll: boolean = false): void {
    // If it's not a reroll, and the entities are already fetched, do not fetch again ut reassign.
    if (!reroll && this.globalStateService.isEntitiesAlreadyFetched()) {
      this.objs = this.currentStep.entitiesPreviouslyFetched;
      this.allowClicksActionsAfterDelay();
      return;
    }
    if (!environment.production) {
      console.log("DEV ENVIRONMENT")
      this.objs = characterDummydata;
      this.globalStateService.updateEntitiesPreviouslyFetched(
        this.objs,
        reroll
      );
      this.allowClicksActionsAfterDelay();

      return;
    }

    // Empty the list of objs, so the out-animation trigger meanwhile re-fetching
    this.objs = [];
    // Prevent click on cards meanwhile fetching
    this.isClickPrevented = true;
    this.dataService
      .getStarwarsEntites(this.currentStep.associatedStarwarsEntity + 's')
      .subscribe({
        next: (data: IStarwarsEntity[]) => {
          this.objs = this.utilsService.keepRandomObjects(3, data);
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

  chooseActionHandler(starwarsEntity: IStarwarsEntity) {
    this.globalStateService.updateStateWithParams(
      this.currentStep.associatedStarwarsEntity,
      starwarsEntity,
      SteppingDirection.Forward
    );

    this.getStarwarsEntites();
  }

  rerollActionHandler() {
    this.getStarwarsEntites(true);
  }
}
