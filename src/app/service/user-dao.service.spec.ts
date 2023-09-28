/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDaoService } from './user-dao.service';

describe('Service: UserDao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDaoService]
    });
  });

  it('should ...', inject([UserDaoService], (service: UserDaoService) => {
    expect(service).toBeTruthy();
  }));
});
