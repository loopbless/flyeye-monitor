import { TestBed } from '@angular/core/testing';

import { ApplicationApi } from './application.api';

describe('AppApi', () => {
  let service: ApplicationApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
