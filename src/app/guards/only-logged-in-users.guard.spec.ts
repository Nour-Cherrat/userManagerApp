import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onlyLoggedInUsersGuard } from './only-logged-in-users.guard';

describe('onlyLoggedInUsersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onlyLoggedInUsersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
