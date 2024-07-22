import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditWholesalerFluxChartComponent} from './credit-wholesaler-flux-chart.component';

describe('CreditWholesalerFluxChartComponent', () => {
    let component: CreditWholesalerFluxChartComponent;
    let fixture: ComponentFixture<CreditWholesalerFluxChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditWholesalerFluxChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditWholesalerFluxChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
