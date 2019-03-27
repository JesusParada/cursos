import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosSistemaComponent } from './productos-sistema.component';

describe('ProductosSistemaComponent', () => {
  let component: ProductosSistemaComponent;
  let fixture: ComponentFixture<ProductosSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
