import {TestBed} from '@angular/core/testing';

import {LenderProvisionService} from './lender-provision.service';

describe('LenderProvisionService', () => {
    let service: LenderProvisionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LenderProvisionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
