import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingPanelComponent } from './choose-panel.component';

describe('ChoosingPanelComponent', () => {
  let component: ChoosingPanelComponent;
  let fixture: ComponentFixture<ChoosingPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosingPanelComponent]
    });
    fixture = TestBed.createComponent(ChoosingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
