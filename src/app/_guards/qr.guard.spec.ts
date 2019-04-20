import { TestBed, async, inject } from '@angular/core/testing';

import { QrGuard } from './qr.guard';

describe('QrGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QrGuard]
    });
  });

  it('should ...', inject([QrGuard], (guard: QrGuard) => {
    expect(guard).toBeTruthy();
  }));
});
