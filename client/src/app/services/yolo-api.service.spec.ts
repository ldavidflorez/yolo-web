import { TestBed } from '@angular/core/testing';

import { YoloApiService } from './yolo-api.service';

describe('YoloApiService', () => {
  let service: YoloApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoloApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
