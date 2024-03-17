import {TestBed} from '@angular/core/testing';

import {BackendStravaService} from './backend-strava.service';

describe('BackendStravaService', () => {
  let service: BackendStravaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendStravaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
