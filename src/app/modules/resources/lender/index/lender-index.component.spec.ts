import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LenderIndexComponent} from './lender-index.component';

describe('IndexComponent', () => {
    let component: LenderIndexComponent;
    let fixture: ComponentFixture<LenderIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LenderIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LenderIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
