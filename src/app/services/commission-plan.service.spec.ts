import {TestBed} from '@angular/core/testing';

import {CommissionPlanService} from './commission-plan.service';

describe('CommissionPlanService', () => {
    let service: CommissionPlanService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CommissionPlanService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
