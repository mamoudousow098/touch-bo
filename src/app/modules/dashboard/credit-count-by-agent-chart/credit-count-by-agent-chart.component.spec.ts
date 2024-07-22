import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCountByAgentChartComponent} from './credit-count-by-agent-chart.component';

describe('CreditChartComponent', () => {
    let component: CreditCountByAgentChartComponent;
    let fixture: ComponentFixture<CreditCountByAgentChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditCountByAgentChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditCountByAgentChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
