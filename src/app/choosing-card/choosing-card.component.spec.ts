import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingCardComponent } from './choosing-card.component';

describe('CharacterCardComponent', () => {
  let component: ChoosingCardComponent;
  let fixture: ComponentFixture<ChoosingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosingCardComponent]
    });
    fixture = TestBed.createComponent(ChoosingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
