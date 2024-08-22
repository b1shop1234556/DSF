import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccHomepageComponent } from './acc-homepage.component';

describe('AccHomepageComponent', () => {
  let component: AccHomepageComponent;
  let fixture: ComponentFixture<AccHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
