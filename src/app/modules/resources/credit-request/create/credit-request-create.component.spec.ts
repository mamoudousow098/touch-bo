import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditRequestCreateComponent} from './credit-request-create.component';

describe('CreateComponent', () => {
    let component: CreditRequestCreateComponent;
    let fixture: ComponentFixture<CreditRequestCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditRequestCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditRequestCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
