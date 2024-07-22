import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WholesalerIndexComponent} from './wholesaler-index.component';

describe('IndexComponent', () => {
    let component: WholesalerIndexComponent;
    let fixture: ComponentFixture<WholesalerIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WholesalerIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WholesalerIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
