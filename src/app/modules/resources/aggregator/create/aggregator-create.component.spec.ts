import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AggregatorCreateComponent} from './aggregator-create.component';

describe('aggregatorCreateComponent', () => {
    let component: AggregatorCreateComponent;
    let fixture: ComponentFixture<AggregatorCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AggregatorCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AggregatorCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
