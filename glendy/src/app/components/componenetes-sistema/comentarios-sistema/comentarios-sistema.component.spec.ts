import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosSistemaComponent } from './comentarios-sistema.component';

describe('ComentariosSistemaComponent', () => {
  let component: ComentariosSistemaComponent;
  let fixture: ComponentFixture<ComentariosSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
