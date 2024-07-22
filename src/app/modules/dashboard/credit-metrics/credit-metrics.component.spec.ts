import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditMetricsComponent } from './credit-metrics.component';

describe('CreditMetricsComponent', () => {
  let component: CreditMetricsComponent;
  let fixture: ComponentFixture<CreditMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
