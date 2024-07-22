import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSuplierComponent } from './show-suplier.component';

describe('ShowSuplierComponent', () => {
  let component: ShowSuplierComponent;
  let fixture: ComponentFixture<ShowSuplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSuplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSuplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
