import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkForChangesGuard } from './check-for-changes.guard';

describe('checkForChangesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkForChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
