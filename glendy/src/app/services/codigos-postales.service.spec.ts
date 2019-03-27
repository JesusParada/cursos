import { TestBed, inject } from '@angular/core/testing';

import { CodigosPostalesService } from './codigos-postales.service';

describe('CodigosPostalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodigosPostalesService]
    });
  });

  it('should be created', inject([CodigosPostalesService], (service: CodigosPostalesService) => {
    expect(service).toBeTruthy();
  }));
});
