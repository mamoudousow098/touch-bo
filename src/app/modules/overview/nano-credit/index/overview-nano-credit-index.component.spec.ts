import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewNanoCreditIndexComponent} from './overview-nano-credit-index.component';

describe('IndexComponent', () => {
    let component: OverviewNanoCreditIndexComponent;
    let fixture: ComponentFixture<OverviewNanoCreditIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OverviewNanoCreditIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OverviewNanoCreditIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
