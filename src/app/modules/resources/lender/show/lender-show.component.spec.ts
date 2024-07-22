import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LenderShowComponent} from './lender-show.component';

describe('DetailsComponent', () => {
    let component: LenderShowComponent;
    let fixture: ComponentFixture<LenderShowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LenderShowComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LenderShowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
