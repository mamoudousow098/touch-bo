import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundRequestIndexComponent } from './refund-request-index.component';

describe('RefundRequestIndexComponent', () => {
  let component: RefundRequestIndexComponent;
  let fixture: ComponentFixture<RefundRequestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundRequestIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundRequestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
