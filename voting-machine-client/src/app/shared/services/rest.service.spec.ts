/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { RestService } from './rest.service';
import { CalculateService } from './calculate.service';
import { AppModule } from '../../app.module';
import { Http, Response, Headers, RequestOptions, RequestMethod, XHRBackend, ResponseOptions } from '@angular/http';
describe('RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [RestService,
        CalculateService,
        { provide: XHRBackend, useClass: MockBackend }]
    });
  });
  it('Should create rest.service', inject([RestService], (service: RestService) => {
    expect(service instanceof RestService).toBeTruthy();
  }));
  it('Should instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    const service = new RestService(http);
    expect(service instanceof RestService).toBe(true, 'new service should be ok');
  }));
  it('Should get question', inject([RestService], (service: RestService) => {
    expect(service.getQuestion()).toBeTruthy();
  }));
  it('Should get answers', inject([RestService], (service: RestService) => {
    expect(service.getAnswers()).toBeTruthy();
  }));
});
