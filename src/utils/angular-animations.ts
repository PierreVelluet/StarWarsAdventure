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

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(1000, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate(1000, style({ opacity: 0 })),
  ]),
]);
