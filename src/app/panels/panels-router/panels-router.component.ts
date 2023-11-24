import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { IGameStep } from 'src/typescript/interfaces/state-interface';
import { GlobalStateService } from '../../services/globalState/global-state.service';

@Component({
  selector: 'app-views-router',
  templateUrl: './panels-router.component.html',
  styleUrls: ['./panels-router.component.css'],
})
export class ViewsRouterComponent {
  public generalState: any;
  public currentStep!: IGameStep;
  private _gameStep_subscription: Subscription;
  public displayWelcomePanel: boolean = true;
  public displayChoosingPanel: boolean = false;

  constructor(private globalStateService: GlobalStateService) {
    this.generalState = this.globalStateService.getGeneralState();
    this._gameStep_subscription =
      this.globalStateService.globalSharedState$.subscribe((value) => {
        (this.currentStep = value.gameStep),
          this.panelDisplayByStepId(value.gameStep.id);
      });
  }

  ngOnInit() {
    if (!this.displayWelcomePanel) return;
  }

  panelDisplayByStepId(gameStepId: number): void {
    switch (gameStepId) {
      case 0: {
        this.displayWelcomePanel = true;
        this.displayChoosingPanel = false;
        break;
      }
      case 1:
      case 2:
      case 3:
      case 4: {
        this.displayChoosingPanel = true;
        this.displayWelcomePanel = false;
        break;
      }

      default:
        return;
    }
  }
}
