import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCountByAggregatorComponent } from './credit-count-by-aggregator.component';

describe('CreditCountByAggregatorComponent', () => {
  let component: CreditCountByAggregatorComponent;
  let fixture: ComponentFixture<CreditCountByAggregatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCountByAggregatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCountByAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
