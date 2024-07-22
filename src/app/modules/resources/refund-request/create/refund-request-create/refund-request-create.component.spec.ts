import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundRequestCreateComponent } from './refund-request-create.component';

describe('RefundRequestCreateComponent', () => {
  let component: RefundRequestCreateComponent;
  let fixture: ComponentFixture<RefundRequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundRequestCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
