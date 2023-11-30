import {
  ICharacteristic,
  IGameStep,
  IState,
} from 'src/typescript/interfaces/general-interfaces';

export const gameSteps: IGameStep[] = [
  {
    id: 0,
    name: 'Welcoming and rules',
    associatedStarwarsEntity: '',
    completed: false,
    currentStepType: 0,
    currentTransitiontype: 0,
  },
  {
    id: 1,
    name: 'Character choosing',
    associatedStarwarsEntity: 'character',
    stepperLabel: 'Character',
    completed: false,
    currentStepType: 1,
    entitiesPreviouslyFetched: null,
    numberOfReroll: 1,
    currentTransitiontype: 1,
  },
  {
    id: 2,
    name: 'Vehicle choosing',
    associatedStarwarsEntity: 'vehicle',
    stepperLabel: 'Vehicle',
    completed: false,
    currentStepType: 1,
    entitiesPreviouslyFetched: null,
    numberOfReroll: 1,
    currentTransitiontype: 1,
  },
  {
    id: 3,
    name: 'Droid choosing',
    associatedStarwarsEntity: 'droid',
    stepperLabel: 'Droid',
    completed: false,
    currentStepType: 1,
    entitiesPreviouslyFetched: null,
    numberOfReroll: 1,
    currentTransitiontype: 1,
  },
  {
    id: 4,
    name: 'Location choosing',
    associatedStarwarsEntity: 'location',
    stepperLabel: 'Location',
    completed: false,
    currentStepType: 1,
    entitiesPreviouslyFetched: null,
    numberOfReroll: 1,
    currentTransitiontype: 1,
  },
  {
    id: 5,
    name: 'Game in progress',
    associatedStarwarsEntity: '',
    completed: false,
    currentStepType: 2,
    currentTransitiontype: 1,
  },
];

export const baseCharacteristics: ICharacteristic[] = [
  {
    name: 'Strengh',
    value: 6,
    image: '/assets/images/strengh.webp',
    description:
      'The strengh characteristics is used to calculatre the outcome of an attack.',
  },
  {
    name: 'Defense',
    value: 6,
    image: '/assets/images/defense.jpeg',
    description:
      "The defense characteristics is used to calculatre the outcome of an ennemy's attack.",
  },
  {
    name: 'Initiative',
    value: 6,
    image: '/assets/images/initiative.jpeg',
    description:
      'The initiative characteristic is used in various situation, like first strike in combat, or fleeing from one.',
  },
];

export const baseState: IState = {
  loading: false,
  currentGameStep: gameSteps[0],
  localStorageStoreKey: 'starwarsAdventureKey',
  mainCharacter: {
    character: null,
    droid: null,
    vehicle: null,
    location: null,
    characteristics: baseCharacteristics,
  },
};
