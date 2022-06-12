import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { NetworkService } from './network.service';

describe('NetworkService', () => {
  let service: NetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [NetworkService]
    });
    service = TestBed.inject(NetworkService);
  });

  it('should fetch a random joke from ICNDB API', (done: DoneFn) => {
    service.aRandomJoke.subscribe(it => {
      expect(it).toBeDefined();
      done();
    });
  });
});
