import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoanRequestIndexComponent} from './loan-request-index.component';

describe('IndexComponent', () => {
    let component: LoanRequestIndexComponent;
    let fixture: ComponentFixture<LoanRequestIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoanRequestIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoanRequestIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
