import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditRequestValidationComponent} from './credit-request-validation.component';

describe('ValidationComponent', () => {
    let component: CreditRequestValidationComponent;
    let fixture: ComponentFixture<CreditRequestValidationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditRequestValidationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditRequestValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
