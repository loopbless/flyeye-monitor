import { TestBed } from '@angular/core/testing';

import { PassportApi } from './passport.api';

describe('PassportService', () => {
  let service: PassportApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassportApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
