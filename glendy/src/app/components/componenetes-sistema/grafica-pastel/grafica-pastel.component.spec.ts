import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaPastelComponent } from './grafica-pastel.component';

describe('GraficaPastelComponent', () => {
  let component: GraficaPastelComponent;
  let fixture: ComponentFixture<GraficaPastelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaPastelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaPastelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
