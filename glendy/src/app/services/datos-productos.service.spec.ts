import { TestBed, inject } from '@angular/core/testing';

import { DatosProductosService } from './datos-productos.service';

describe('DatosProductosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatosProductosService]
    });
  });

  it('should be created', inject([DatosProductosService], (service: DatosProductosService) => {
    expect(service).toBeTruthy();
  }));
});
