import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRequestShowComponent } from './credit-request-show.component';

describe('CreditRequestShowComponent', () => {
  let component: CreditRequestShowComponent;
  let fixture: ComponentFixture<CreditRequestShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditRequestShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditRequestShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
