import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfeesComponent } from './editfees.component';

describe('EditfeesComponent', () => {
  let component: EditfeesComponent;
  let fixture: ComponentFixture<EditfeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditfeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
