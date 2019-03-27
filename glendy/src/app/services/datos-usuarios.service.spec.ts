import { TestBed, inject } from '@angular/core/testing';

import { DatosUsuariosService } from './datos-usuarios.service';

describe('DatosUsuariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatosUsuariosService]
    });
  });

  it('should be created', inject([DatosUsuariosService], (service: DatosUsuariosService) => {
    expect(service).toBeTruthy();
  }));
});
