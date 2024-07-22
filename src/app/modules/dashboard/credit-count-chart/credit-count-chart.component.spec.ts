import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreditCountChartComponent} from './credit-count-chart.component';

describe('CreditChartComponent', () => {
    let component: CreditCountChartComponent;
    let fixture: ComponentFixture<CreditCountChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreditCountChartComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreditCountChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
