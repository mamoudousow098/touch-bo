import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationStageUpdateComponent } from './validation-stage-update.component';

describe('ValidationStageUpdateComponent', () => {
  let component: ValidationStageUpdateComponent;
  let fixture: ComponentFixture<ValidationStageUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationStageUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationStageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
