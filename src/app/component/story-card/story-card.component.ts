import { Component, Input } from '@angular/core';
import { IStory } from 'src/typescript/interfaces/general-interfaces';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent {
  @Input() public story!: IStory;

  lazyLoadImage: string;
  defaultImage: String;
  imageToShowOnError: string;

  constructor() {
    this.lazyLoadImage = this.story?.imagePath?.toString();
    this.defaultImage = '/assets/images/placeHolder.png';
    this.imageToShowOnError = '/assets/images/error.png';
  }
}
