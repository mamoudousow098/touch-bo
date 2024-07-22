import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundRequestUpdateComponent } from './refund-request-update.component';

describe('RefundRequestUpdateComponent', () => {
  let component: RefundRequestUpdateComponent;
  let fixture: ComponentFixture<RefundRequestUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundRequestUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundRequestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
