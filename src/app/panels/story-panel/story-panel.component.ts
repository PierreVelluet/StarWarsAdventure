import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/globalState/store.service';
import { IState, IStory, IStoryState } from 'src/typescript/interfaces/general-interfaces';
import { StoryService } from 'src/app/services/story/story.service';

@Component({
  selector: 'app-story-panel',
  templateUrl: './story-panel.component.html',
  styleUrls: ['./story-panel.component.css']
})
export class StoryPanelComponent {

  public storyState!: IStoryState;
  public story!: IStory;
  constructor(private globalStateService: StoreService, private storyService: StoryService) {
    this.globalStateService.sharedState$.subscribe((value: IState) => {
      this.storyState = value.storyState;
    });
  }

  ngOnInit(): void {
    this.story = this.storyService.getStoryById(this.storyState.currentStoryId);
  }

}
