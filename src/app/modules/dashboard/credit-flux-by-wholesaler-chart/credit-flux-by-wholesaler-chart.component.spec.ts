import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditFluxByWholesalerChartComponent} from './credit-flux-by-wholesaler-chart.component';

describe('CreditFluxByWholesalerChartComponent', () => {
    let component: CreditFluxByWholesalerChartComponent;
    let fixture: ComponentFixture<CreditFluxByWholesalerChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditFluxByWholesalerChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditFluxByWholesalerChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
