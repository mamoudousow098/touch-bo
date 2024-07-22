import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WholesalerProvisionValidationComponent} from './wholesaler-provision-validation.component';

describe('ValidationComponent', () => {
    let component: WholesalerProvisionValidationComponent;
    let fixture: ComponentFixture<WholesalerProvisionValidationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WholesalerProvisionValidationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WholesalerProvisionValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
