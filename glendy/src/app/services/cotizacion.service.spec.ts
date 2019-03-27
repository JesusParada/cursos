import { TestBed, inject } from '@angular/core/testing';

import { MailCotizacionService } from './mail.cotizacion.service';

describe('CotizacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailCotizacionService]
    });
  });

  it('should be created', inject([MailCotizacionService], (service: MailCotizacionService) => {
    expect(service).toBeTruthy();
  }));
});
