import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LenderProvisionIndexComponent} from './lender-provision-index.component';

describe('IndexComponent', () => {
    let component: LenderProvisionIndexComponent;
    let fixture: ComponentFixture<LenderProvisionIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LenderProvisionIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LenderProvisionIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
