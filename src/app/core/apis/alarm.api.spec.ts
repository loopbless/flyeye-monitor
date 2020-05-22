import { TestBed } from '@angular/core/testing';

import { AlarmApi } from './alarm.api';

describe('AlarmService', () => {
  let service: AlarmApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
