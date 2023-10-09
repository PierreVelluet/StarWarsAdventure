// import { Component } from '@angular/core';

import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Hero } from 'src/typescript/classes/Hero';
import { CommonModule } from '@angular/common';

/**
 * @title Hero card to choose from
 */
@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class CharacterCardComponent {
  hovered: boolean;
  startHide: boolean;
  constructor() {
    this.hovered = false;
    this.startHide = false;
  }
  @Input() hero: Hero = {
    name: 'Dark Vador',
    id: 2,
    attack: 7,
    defense: 2,
    health: 4,
    description: 'A strong warrior',
    portrait:
      'http://img04.deviantart.net/92f1/i/2010/274/9/a/darth_vader_by_deviantyurai-d2zucev.jpg',
  };

  async handleHover() {
    if (this.hovered) {
      this.startHide = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.startHide = false;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    this.hovered = !this.hovered;
  }

  trimString(text: string, maxLenght: number): string {
    if (text.length >= maxLenght) return text.slice(0, maxLenght) + '...';
    else return text;
  }
}
