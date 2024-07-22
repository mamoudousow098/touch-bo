import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditFluxByAggregatorComponent } from './credit-flux-by-aggregator.component';

describe('CreditFluxByAggregatorComponent', () => {
  let component: CreditFluxByAggregatorComponent;
  let fixture: ComponentFixture<CreditFluxByAggregatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditFluxByAggregatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditFluxByAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
