import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaVentasComponent } from './entrega-ventas.component';

describe('EntregaVentasComponent', () => {
  let component: EntregaVentasComponent;
  let fixture: ComponentFixture<EntregaVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
