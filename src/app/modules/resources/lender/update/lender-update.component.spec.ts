import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LenderUpdateComponent} from './lender-update.component';

describe('LenderCreateComponent', () => {
    let component: LenderUpdateComponent;
    let fixture: ComponentFixture<LenderUpdateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LenderUpdateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LenderUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
