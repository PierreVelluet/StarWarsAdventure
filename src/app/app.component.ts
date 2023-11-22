import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingStateService } from './services/globalState/loading-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'StarWarsAventure';
  loading: boolean = false;
  constructor(private _loading: LoadingStateService) {}
  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loadingObs$
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
