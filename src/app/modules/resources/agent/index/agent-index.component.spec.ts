import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgentIndexComponent} from './agent-index.component';

describe('IndexComponent', () => {
    let component: AgentIndexComponent;
    let fixture: ComponentFixture<AgentIndexComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgentIndexComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AgentIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
