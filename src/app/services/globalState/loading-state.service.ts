import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingStateService {
  private loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loadingObs$: Observable<boolean> = this.loadingSub.asObservable();

  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() {}

  public getLoading(): boolean {
    return this.loadingSub.getValue();
  }

  public setLoading(newLoadingState: boolean, url: string): void {
    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function'
      );
    }
    if (newLoadingState === true) {
      this.loadingMap.set(url, newLoadingState);
      this.loadingSub.next(true);
    } else if (newLoadingState === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
    console.log('Loading state has been set to: ', newLoadingState);
  }
}
