import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationStageCreateComponent } from './validation-stage-create.component';

describe('ValidationStageCreateComponent', () => {
  let component: ValidationStageCreateComponent;
  let fixture: ComponentFixture<ValidationStageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationStageCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationStageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
