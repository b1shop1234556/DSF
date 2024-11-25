import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitiodisComponent } from './tuitiodis.component';

describe('TuitiodisComponent', () => {
  let component: TuitiodisComponent;
  let fixture: ComponentFixture<TuitiodisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuitiodisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuitiodisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
