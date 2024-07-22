import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewRefundRequestIndexComponent} from './overview-refund-request-index.component';

describe('IndexComponent', () => {
    let component: OverviewRefundRequestIndexComponent;
    let fixture: ComponentFixture<OverviewRefundRequestIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OverviewRefundRequestIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OverviewRefundRequestIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
