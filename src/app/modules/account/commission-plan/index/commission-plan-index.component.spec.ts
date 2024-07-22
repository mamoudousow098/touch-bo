import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommissionPlanIndexComponent} from './commission-plan-index.component';

describe('IndexComponent', () => {
    let component: CommissionPlanIndexComponent;
    let fixture: ComponentFixture<CommissionPlanIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommissionPlanIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CommissionPlanIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
