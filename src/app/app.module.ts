import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterChoosingPanelComponent } from './character-choosing-panel/character-choosing-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterChoosingPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CharacterCardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
