import { TestBed, inject } from '@angular/core/testing';

import { DatosComentariosService } from './datos-comentarios.service';

describe('DatosComentariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatosComentariosService]
    });
  });

  it('should be created', inject([DatosComentariosService], (service: DatosComentariosService) => {
    expect(service).toBeTruthy();
  }));
});
