import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgentsBulkSettingsComponent} from './agents-bulk-settings.component';

describe('UpdateAgentComponent', () => {
    let component: AgentsBulkSettingsComponent;
    let fixture: ComponentFixture<AgentsBulkSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgentsBulkSettingsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AgentsBulkSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
