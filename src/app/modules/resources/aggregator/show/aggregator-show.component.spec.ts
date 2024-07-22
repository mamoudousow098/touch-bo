import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AggregatorShowComponent} from './aggregator-show.component';

describe('AggregatorComponent', () => {
    let component: AggregatorShowComponent;
    let fixture: ComponentFixture<AggregatorShowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AggregatorShowComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AggregatorShowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
