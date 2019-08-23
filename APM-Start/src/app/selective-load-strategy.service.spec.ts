/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectiveLoadStrategyService } from './selective-load-strategy.service';

describe('Service: SelectiveLoadStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectiveLoadStrategyService]
    });
  });

  it('should ...', inject([SelectiveLoadStrategyService], (service: SelectiveLoadStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
