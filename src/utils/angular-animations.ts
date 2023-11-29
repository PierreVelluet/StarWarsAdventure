import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const choosingCardsListAnimation = trigger(
  'choosingCardsListAnimation',
  [
    transition('* <=> *', [
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          stagger('600ms', animate('600ms ease-out', style({ opacity: 1 }))),
        ],
        { optional: true }
      ),
      query(':leave', animate('300ms', style({ opacity: 0 })), {
        optional: true,
      }),
    ]),
  ]
);
