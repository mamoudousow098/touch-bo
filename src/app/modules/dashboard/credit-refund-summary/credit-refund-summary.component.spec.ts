import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRefundSummaryComponent } from './credit-refund-summary.component';

describe('CreditRefundSummaryComponent', () => {
  let component: CreditRefundSummaryComponent;
  let fixture: ComponentFixture<CreditRefundSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditRefundSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditRefundSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
