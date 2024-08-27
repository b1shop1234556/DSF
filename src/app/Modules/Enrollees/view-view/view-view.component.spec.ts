import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewViewComponent } from './view-view.component';

describe('ViewViewComponent', () => {
  let component: ViewViewComponent;
  let fixture: ComponentFixture<ViewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
