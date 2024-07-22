import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewCreditRequestIndexComponent} from './overview-credit-request-index.component';

describe('IndexComponent', () => {
    let component: OverviewCreditRequestIndexComponent;
    let fixture: ComponentFixture<OverviewCreditRequestIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OverviewCreditRequestIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OverviewCreditRequestIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
