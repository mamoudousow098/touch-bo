import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkProductsComponent } from './bulk-products.component';

describe('BulkProductsComponent', () => {
  let component: BulkProductsComponent;
  let fixture: ComponentFixture<BulkProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
