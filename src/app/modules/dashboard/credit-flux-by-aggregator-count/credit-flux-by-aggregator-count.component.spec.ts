import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditFluxByAggregatorCountComponent } from './credit-flux-by-aggregator-count.component';

describe('CreditFluxByAggregatorCountComponent', () => {
  let component: CreditFluxByAggregatorCountComponent;
  let fixture: ComponentFixture<CreditFluxByAggregatorCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditFluxByAggregatorCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditFluxByAggregatorCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
