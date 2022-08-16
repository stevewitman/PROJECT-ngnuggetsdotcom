import { TestBed } from '@angular/core/testing';

import { AdminPostsService } from './admin-posts.service';

describe('AdminPostsService', () => {
  let service: AdminPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
