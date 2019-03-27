import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarVentaComponent } from './confirmar-venta.component';

describe('ConfirmarVentaComponent', () => {
  let component: ConfirmarVentaComponent;
  let fixture: ComponentFixture<ConfirmarVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
