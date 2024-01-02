import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';

import { LoadingStateService } from './services/globalState/loading-state.service';
import { StoreService } from './services/globalState/store.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public loading: boolean = false;
  constructor(
    private _loading: LoadingStateService,
    private _globalStateService: StoreService,
    translate: TranslateService
  ) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
  ngOnInit() {
    this.listenToLoading();
    this._globalStateService.updateStateWithCachedOne();
  }

  listenToLoading(): void {
    this._loading.loadingObs$
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
