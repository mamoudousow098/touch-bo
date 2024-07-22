import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatsByAggregatorComponent} from './stats-by-aggregator.component';

describe('StatsByAggregatorComponent', () => {
    let component: StatsByAggregatorComponent;
    let fixture: ComponentFixture<StatsByAggregatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StatsByAggregatorComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(StatsByAggregatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
