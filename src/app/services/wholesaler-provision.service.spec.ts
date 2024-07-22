import {TestBed} from '@angular/core/testing';

import {WholesalerProvisionService} from './wholesaler-provision.service';

describe('WholesalerProvisionService', () => {
    let service: WholesalerProvisionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WholesalerProvisionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
