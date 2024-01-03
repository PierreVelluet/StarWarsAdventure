import { Component, Input } from '@angular/core';

import { UtilsService } from 'src/app/services/utils/utils.service';
import { ICharacteristic } from 'src/typescript/interfaces/general-interfaces';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
  standalone: true,
})
export class CharacterDetailComponent {
  @Input() public property!: IStarwarsEntity | ICharacteristic;
  public name: string = '';
  public image: string = '';
  public text: string = '';

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.name = this.property.name + this.addCharacteristicValue(this.property);
    this.image = this.property.image;
    this.text = this.utilsService.trimString(this.property.description, 150);
  }

  isInstanceOfIStarwarsEntity(object: any): object is IStarwarsEntity {
    return '_id' in object;
  }

  addCharacteristicValue(property: IStarwarsEntity | ICharacteristic): string {
    if (this.isInstanceOfIStarwarsEntity(property)) return '';

    return ` (${property.value})`;
  }
}
