import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationStageIndexComponent } from './validation-stage-index.component';

describe('ValidationStageIndexComponent', () => {
  let component: ValidationStageIndexComponent;
  let fixture: ComponentFixture<ValidationStageIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationStageIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationStageIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
