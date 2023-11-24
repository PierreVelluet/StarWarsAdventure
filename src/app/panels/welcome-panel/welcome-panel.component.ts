import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ScrollingTextComponent } from 'src/app/component/scrolling-text/scrolling-text.component';

@Component({
  selector: 'app-welcome-panel',
  templateUrl: './welcome-panel.component.html',
  styleUrls: ['./welcome-panel.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, ScrollingTextComponent],
})
export class WelcomePanelComponent {
  public step1: boolean = true;
  public step2: boolean = false;
  public step3: boolean = false;

  constructor() {}

  ngOnInit() {
    this.starWarsAnimation();
  }

  // Stop step1 and start step2 some seconds after
  launchButtonHandler(): void {
    this.step1 = false;
    setTimeout(() => {
      this.step2 = true;
    }, 10000);
    setTimeout(() => {
      console.log('<welcome-panel.component>  this.step3',  this.step3);
      this.step3 = true;
    }, 30000);
  }

  // End the introduction and set-up the game
  startButtonHandler() {
    console.log('launched');
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
