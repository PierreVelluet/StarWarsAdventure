import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingModalComponent } from './choosing-modal.component';

describe('ChoosingModalComponent', () => {
  let component: ChoosingModalComponent;
  let fixture: ComponentFixture<ChoosingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosingModalComponent]
    });
    fixture = TestBed.createComponent(ChoosingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
