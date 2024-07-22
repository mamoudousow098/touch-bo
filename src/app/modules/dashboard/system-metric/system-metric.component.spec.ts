import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMetricComponent } from './system-metric.component';

describe('SystemMetricComponent', () => {
  let component: SystemMetricComponent;
  let fixture: ComponentFixture<SystemMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemMetricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
