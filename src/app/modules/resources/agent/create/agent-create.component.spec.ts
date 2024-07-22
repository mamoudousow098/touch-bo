import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgentCreateComponent} from './agent-create.component';

describe('CreateComponent', () => {
    let component: AgentCreateComponent;
    let fixture: ComponentFixture<AgentCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgentCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AgentCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
