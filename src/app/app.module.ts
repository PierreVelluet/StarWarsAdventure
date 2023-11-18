import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './menus/navbar/navbar.component';
import { AppComponent } from './app.component';
import { ChoosingCardComponent } from './choosing-card/choosing-card.component';
import { ChoosingPanelComponent } from './choosing-panel/choosing-panel.component';
import { GlobalErrorHandler } from './global-error-handler';
import { ServerErrorInterceptor } from './server-error.interceptor';
import { ChoosingModalComponent } from './choosing-modal/choosing-modal.component';
import { ChoosingStepper } from './choosing-stepper/choosing-stepper.component';

@NgModule({
  declarations: [AppComponent, ChoosingPanelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ChoosingCardComponent,
    NavbarComponent,
    HttpClientModule,
    MatSnackBarModule,
    ChoosingModalComponent,
    ChoosingStepper
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
