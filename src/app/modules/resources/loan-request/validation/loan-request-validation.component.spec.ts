import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoanRequestValidationComponent} from './loan-request-validation.component';

describe('ValidationComponent', () => {
    let component: LoanRequestValidationComponent;
    let fixture: ComponentFixture<LoanRequestValidationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoanRequestValidationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoanRequestValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
