import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditFluxByAgentChartComponent} from './credit-flux-by-agent-chart.component';

describe('CreditChartComponent', () => {
    let component: CreditFluxByAgentChartComponent;
    let fixture: ComponentFixture<CreditFluxByAgentChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditFluxByAgentChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditFluxByAgentChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
