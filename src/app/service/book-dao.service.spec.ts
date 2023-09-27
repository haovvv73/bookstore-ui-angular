import { TestBed } from '@angular/core/testing';

import { BookDAOService } from './book-dao.service';

describe('BookDAOService', () => {
  let service: BookDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
