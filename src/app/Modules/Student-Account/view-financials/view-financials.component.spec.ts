import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinancialsComponent } from './view-financials.component';

describe('ViewFinancialsComponent', () => {
  let component: ViewFinancialsComponent;
  let fixture: ComponentFixture<ViewFinancialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFinancialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
