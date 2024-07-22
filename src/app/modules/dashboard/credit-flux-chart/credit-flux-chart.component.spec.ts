import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditFluxChartComponent} from './credit-flux-chart.component';

describe('CreditChartComponent', () => {
    let component: CreditFluxChartComponent;
    let fixture: ComponentFixture<CreditFluxChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditFluxChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditFluxChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
