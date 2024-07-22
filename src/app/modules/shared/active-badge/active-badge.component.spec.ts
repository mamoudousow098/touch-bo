import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActiveBadgeComponent} from './active-badge.component';

describe('ActiveBadgeComponent', () => {
    let component: ActiveBadgeComponent;
    let fixture: ComponentFixture<ActiveBadgeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActiveBadgeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ActiveBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
