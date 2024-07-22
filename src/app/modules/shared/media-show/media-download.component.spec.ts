import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MediaDownloadComponent} from './media-download.component';

describe('MediaShowComponent', () => {
    let component: MediaDownloadComponent;
    let fixture: ComponentFixture<MediaDownloadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MediaDownloadComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MediaDownloadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
