import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AggregatorIndexComponent} from './aggregator-index.component';

describe('IndexComponent', () => {
    let component: AggregatorIndexComponent;
    let fixture: ComponentFixture<AggregatorIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AggregatorIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AggregatorIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
