import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OverdraftRequestIndexComponent} from './overdraft-request-index.component';

describe('IndexComponent', () => {
    let component: OverdraftRequestIndexComponent;
    let fixture: ComponentFixture<OverdraftRequestIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OverdraftRequestIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OverdraftRequestIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
