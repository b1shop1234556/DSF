import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayreceiptReportComponent } from './payreceipt-report.component';

describe('PayreceiptReportComponent', () => {
  let component: PayreceiptReportComponent;
  let fixture: ComponentFixture<PayreceiptReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayreceiptReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayreceiptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
