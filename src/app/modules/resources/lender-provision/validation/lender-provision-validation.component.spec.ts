import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LenderProvisionValidationComponent} from './lender-provision-validation.component';

describe('ValidationComponent', () => {
    let component: LenderProvisionValidationComponent;
    let fixture: ComponentFixture<LenderProvisionValidationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LenderProvisionValidationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LenderProvisionValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
