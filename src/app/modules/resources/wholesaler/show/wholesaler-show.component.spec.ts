import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WholesalerShowComponent} from './wholesaler-show.component';

describe('WholesalerComponent', () => {
    let component: WholesalerShowComponent;
    let fixture: ComponentFixture<WholesalerShowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WholesalerShowComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WholesalerShowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
