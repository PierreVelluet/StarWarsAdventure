import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInAnimation } from 'src/utils/angular-animations';

@Component({
  selector: 'app-scrolling-text',
  templateUrl: './scrolling-text.component.html',
  styleUrls: ['./scrolling-text.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [fadeInAnimation],
})
export class ScrollingTextComponent {
  constructor() {}
}
