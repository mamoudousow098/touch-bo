import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WholesalerUpdateComponent} from './wholesaler-update.component';

describe('CreateComponent', () => {
    let component: WholesalerUpdateComponent;
    let fixture: ComponentFixture<WholesalerUpdateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WholesalerUpdateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WholesalerUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
