import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ScrollingTextComponent } from 'src/app/component/scrolling-text/scrolling-text.component';
import { WelcomingSteps } from 'src/typescript/enums';
import { GlobalStateService } from 'src/app/services/globalState/global-state.service';
import { ChangeStepDirection } from 'src/typescript/enums';

@Component({
  selector: 'app-welcome-panel',
  templateUrl: './welcome-panel.component.html',
  styleUrls: ['./welcome-panel.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, ScrollingTextComponent],
})
export class WelcomePanelComponent {
  public allWelcomingSteps = WelcomingSteps;
  public currentWelcomingStep = WelcomingSteps.Step0;

  constructor(private globalStateService: GlobalStateService) {}

  ngOnInit() {
    this.starWarsAnimation();
  }

  launchButtonHandler(): void {
    this.currentWelcomingStep = this.allWelcomingSteps.Step1;
    setTimeout(() => {
      this.currentWelcomingStep = this.allWelcomingSteps.Step2;
    }, 10000);
    setTimeout(() => {
      this.currentWelcomingStep = this.allWelcomingSteps.Step3;
    }, 30000);
  }

  // End the introduction and set-up the game
  startButtonHandler() {
    this.globalStateService.changeStep(ChangeStepDirection.Forward);
  }

  //Animations for the logo and title present in step1
  starWarsAnimation(): void {
    var byline = document.getElementById('byline'); // Find the H2
    var bylineText = byline?.innerHTML; // Get the content of the H2
    var bylineArr = bylineText?.split('');
    if (byline == null || bylineArr == null) return; // Split content into array
    byline.innerHTML = ''; // Empty current content

    var span; // Create variables to create elements
    var letter;

    for (let i = 0; i < bylineArr.length; i++) {
      // Loop for every letter
      span = document.createElement('span'); // Create a <span> element
      letter = document.createTextNode(bylineArr[i]); // Create the letter
      if (bylineArr[i] == ' ') {
        // If the letter is a space...
        byline.appendChild(letter); // ...Add the space without a span
      } else {
        span.appendChild(letter); // Add the letter to the span
        byline.appendChild(span); // Add the span to the h2
      }
    }
  }
}
