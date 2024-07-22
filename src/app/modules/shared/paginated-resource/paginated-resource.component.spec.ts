import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaginatedResourceComponent} from './paginated-resource.component';

describe('PaginatedResourceComponent', () => {
    let component: PaginatedResourceComponent;
    let fixture: ComponentFixture<PaginatedResourceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PaginatedResourceComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PaginatedResourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
