import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditRequestIndexComponent} from './credit-request-index.component';

describe('IndexComponent', () => {
    let component: CreditRequestIndexComponent;
    let fixture: ComponentFixture<CreditRequestIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditRequestIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditRequestIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
