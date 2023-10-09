import { Component } from '@angular/core';
import { Hero } from 'src/typescript/classes/Hero';

const heroes: Hero[] = [
  {
    name: 'Qui-Gon Jinn',
    id: 1,
    attack: 5,
    defense: 3,
    health: 5,
    description: 'Qui-Gon Jinn is a Force-sensitive highly respected, yet maverick and unconventional Human male Jedi Master, who lived during the last decades of the Galactic Republic and was most notably responsible for discovering Anakin Skywalker, the Chosen One of the Jedi prophecy, and bringing him into the Jedi Order. An adherent of the Living Force, Jinn always kept his focus in the moment and often clashed with and even openly defied the Jedi High Council. Born in 92 BBY, Qui-Gon Jinn was raised at the Jedi Temple on the galactic capital of Coruscant before being apprenticed at the age of ten to Jedi Knight Dooku.',
    portrait:
      'https://wallpapercave.com/wp/wp7401856.jpg',
  },
  {
    name: 'Dark Vador',
    id: 2,
    attack: 7,
    defense: 2,
    health: 4,
    description: 'Once the heroic Jedi Knight named Anakin Skywalker, Darth Vader was seduced by the dark side of the Force. Forever scarred by his defeat on Mustafar, Vader was transformed into a cybernetically-enhanced Sith Lord. At the dawn of the Empire, Vader led the Empire’s eradication of the Jedi Order and the search for survivors. He remained in service of the Emperor -- the evil Darth Sidious -- for decades, enforcing his Master’s will and seeking to crush the Rebel Alliance and other detractors. But there was still good in him…',
    portrait:
      'http://img04.deviantart.net/92f1/i/2010/274/9/a/darth_vader_by_deviantyurai-d2zucev.jpg',
  },
  {
    name: 'Bobba fett',
    id: 3,
    attack: 4,
    defense: 3,
    health: 5,
    description: 'He’s a simple man making his way through the galaxy, like his father before him. He’s also a fearsome bounty hunter, indomitable survivor, and a man of few words. We could only be talking about Boba Fett.',
    portrait:
      'https://i.pinimg.com/originals/be/81/cf/be81cf6abb9d1cefded05f7cdbef0fe9.jpg',
  },
];

@Component({
  selector: 'app-character-choosing-panel',
  templateUrl: './character-choosing-panel.component.html',
  styleUrls: ['./character-choosing-panel.component.css'],
})
export class CharacterChoosingPanelComponent {
  heroes = heroes;
}
