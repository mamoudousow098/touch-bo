import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommissionPlanCreateComponent} from './commission-plan-create.component';

describe('CreateComponent', () => {
    let component: CommissionPlanCreateComponent;
    let fixture: ComponentFixture<CommissionPlanCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommissionPlanCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CommissionPlanCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
