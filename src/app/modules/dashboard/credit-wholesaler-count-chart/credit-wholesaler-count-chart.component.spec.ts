import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditWholesalerCountChartComponent} from './credit-wholesaler-count-chart.component';

describe('CreditWholesalerCountChartComponent', () => {
    let component: CreditWholesalerCountChartComponent;
    let fixture: ComponentFixture<CreditWholesalerCountChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditWholesalerCountChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditWholesalerCountChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
