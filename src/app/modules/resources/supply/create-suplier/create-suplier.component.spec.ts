import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuplierComponent } from './create-suplier.component';

describe('CreateSuplierComponent', () => {
  let component: CreateSuplierComponent;
  let fixture: ComponentFixture<CreateSuplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSuplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSuplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
