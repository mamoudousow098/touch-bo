import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WholesalerProvisionCreateComponent} from './wholesaler-provision-create.component';

describe('CreateComponent', () => {
    let component: WholesalerProvisionCreateComponent;
    let fixture: ComponentFixture<WholesalerProvisionCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WholesalerProvisionCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WholesalerProvisionCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
