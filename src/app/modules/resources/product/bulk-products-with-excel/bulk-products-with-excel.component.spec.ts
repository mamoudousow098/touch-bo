import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkProductsWithExcelComponent } from './bulk-products-with-excel.component';

describe('BulkProductsWithExcelComponent', () => {
  let component: BulkProductsWithExcelComponent;
  let fixture: ComponentFixture<BulkProductsWithExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkProductsWithExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkProductsWithExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
