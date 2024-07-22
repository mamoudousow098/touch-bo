import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LenderCreateComponent} from './lender-create.component';

describe('LenderCreateComponent', () => {
    let component: LenderCreateComponent;
    let fixture: ComponentFixture<LenderCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LenderCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LenderCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
