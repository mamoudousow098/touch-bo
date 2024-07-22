import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoanRequestRepayComponent} from './loan-request-repay.component';

describe('LoanRequestRepayComponent', () => {
    let component: LoanRequestRepayComponent;
    let fixture: ComponentFixture<LoanRequestRepayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoanRequestRepayComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoanRequestRepayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
