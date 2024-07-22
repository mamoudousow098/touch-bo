import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WholesalerProvisionIndexComponent} from './wholesaler-provision-index.component';

describe('IndexComponent', () => {
    let component: WholesalerProvisionIndexComponent;
    let fixture: ComponentFixture<WholesalerProvisionIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WholesalerProvisionIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WholesalerProvisionIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
