import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPaymentComponent } from './input-payment.component';

describe('InputPaymentComponent', () => {
  let component: InputPaymentComponent;
  let fixture: ComponentFixture<InputPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
