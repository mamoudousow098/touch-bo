import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditFluxByAggregatorFluxComponent } from './credit-flux-by-aggregator-flux.component';

describe('CreditFluxByAggregatorFluxComponent', () => {
  let component: CreditFluxByAggregatorFluxComponent;
  let fixture: ComponentFixture<CreditFluxByAggregatorFluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditFluxByAggregatorFluxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditFluxByAggregatorFluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
