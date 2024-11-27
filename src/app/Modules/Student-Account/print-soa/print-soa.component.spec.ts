import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSOAComponent } from './print-soa.component';

describe('PrintSOAComponent', () => {
  let component: PrintSOAComponent;
  let fixture: ComponentFixture<PrintSOAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintSOAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintSOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
