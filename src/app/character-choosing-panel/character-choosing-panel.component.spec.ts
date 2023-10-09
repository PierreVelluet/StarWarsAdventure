import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterChoosingPanelComponent } from './character-choosing-panel.component';

describe('CharacterChoosingPanelComponent', () => {
  let component: CharacterChoosingPanelComponent;
  let fixture: ComponentFixture<CharacterChoosingPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterChoosingPanelComponent]
    });
    fixture = TestBed.createComponent(CharacterChoosingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
