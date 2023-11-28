import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './menus/navbar/navbar.component';
import { AppComponent } from './app.component';
import { ChoosingCardComponent } from './component/choosing-card/choosing-card.component';
import { ChoosingPanelComponent } from './panels/choose-panel/choose-panel.component';
import { ChoosingModalComponent } from './component/choosing-modal/choosing-modal.component';
import { ChoosingStepper } from './component/choosing-stepper/choosing-stepper.component';
import { WelcomePanelComponent } from './panels/welcome-panel/welcome-panel.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { GlobalErrorHandler } from './global-error-handler';
import { ServerErrorInterceptor } from './server-error.interceptor';
import { HttpRequestInterceptor } from './http-request-interceptor';
import { ViewsRouterComponent } from './panels/panels-router/panels-router.component';
import { ScrollingTextComponent } from './component/scrolling-text/scrolling-text.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, ViewsRouterComponent, ChoosingPanelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ChoosingCardComponent,
    NavbarComponent,
    HttpClientModule,
    MatSnackBarModule,
    ChoosingModalComponent,
    ChoosingStepper,
    LazyLoadImageModule,
    WelcomePanelComponent,
    ScrollingTextComponent,
    MatButtonModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
