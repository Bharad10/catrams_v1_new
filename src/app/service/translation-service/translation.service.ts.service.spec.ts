import { TestBed } from '@angular/core/testing';

import { TranslationServiceTsService } from './translation.service.ts.service';

describe('TranslationServiceTsService', () => {
  let service: TranslationServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
