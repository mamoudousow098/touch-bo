import { TestBed } from '@angular/core/testing';

import { ValidationStageService } from './validation-stage.service';

describe('ValidationStageService', () => {
  let service: ValidationStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
