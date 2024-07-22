import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoanRequestCreateComponent} from './loan-request-create.component';

describe('CreateComponent', () => {
    let component: LoanRequestCreateComponent;
    let fixture: ComponentFixture<LoanRequestCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoanRequestCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoanRequestCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
