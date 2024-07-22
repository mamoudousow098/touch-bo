import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LenderProvisionCreateComponent} from './lender-provision-create.component';

describe('CreateComponent', () => {
    let component: LenderProvisionCreateComponent;
    let fixture: ComponentFixture<LenderProvisionCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LenderProvisionCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LenderProvisionCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
