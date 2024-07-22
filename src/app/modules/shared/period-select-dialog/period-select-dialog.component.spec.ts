import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodSelectDialogComponent } from './period-select-dialog.component';

describe('PeriodSelectDialogComponent', () => {
  let component: PeriodSelectDialogComponent;
  let fixture: ComponentFixture<PeriodSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodSelectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
