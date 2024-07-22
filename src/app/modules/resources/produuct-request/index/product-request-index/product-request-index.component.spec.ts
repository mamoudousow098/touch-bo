import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestIndexComponent } from './product-request-index.component';

describe('ProductRequestIndexComponent', () => {
  let component: ProductRequestIndexComponent;
  let fixture: ComponentFixture<ProductRequestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRequestIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRequestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
