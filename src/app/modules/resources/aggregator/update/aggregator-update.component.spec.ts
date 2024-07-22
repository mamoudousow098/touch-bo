import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AggregatorUpdateComponent} from './aggregator-update.component';

describe('aggregatorCreateComponent', () => {
    let component: AggregatorUpdateComponent;
    let fixture: ComponentFixture<AggregatorUpdateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AggregatorUpdateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AggregatorUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
