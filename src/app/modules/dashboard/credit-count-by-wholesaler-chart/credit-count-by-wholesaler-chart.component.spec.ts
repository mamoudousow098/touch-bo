import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCountByWholesalerChartComponent} from './credit-count-by-wholesaler-chart.component';

describe('CreditCountByWholesalerChartComponent', () => {
    let component: CreditCountByWholesalerChartComponent;
    let fixture: ComponentFixture<CreditCountByWholesalerChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditCountByWholesalerChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditCountByWholesalerChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
