import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WholesalerCreateComponent} from './wholesaler-create.component';

describe('CreateComponent', () => {
    let component: WholesalerCreateComponent;
    let fixture: ComponentFixture<WholesalerCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WholesalerCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WholesalerCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
