/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { RestService } from './rest.service';
import { CalculateService } from './calculate.service';
import { AppModule } from '../../app.module';
import { Http, Response, Headers, RequestOptions,RequestMethod, XHRBackend, ResponseOptions } from '@angular/http';
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
    let service = new RestService(http);
    expect(service instanceof RestService).toBe(true, 'new service should be ok');
  }));
  it('Should get question', inject([RestService], (service: RestService) => {
    expect(service.getQuestion()).toBeTruthy();
  }));
  it('Should get answers', inject([RestService], (service: RestService) => {
    expect(service.getAnswers()).toBeTruthy();
  }));
  // it('Should post answer', inject([RestService], (service: RestService) => {
  //   let value = [{
  //     answer_id: 2,
  //     question: "test",
  //     answer_A:1,
  //     answer_B:1,
  //     answer_C:1,
  //     answer_D:1,
  //   }]
  //   expect(service.addAnswer(value).toBeTruthy();
  // }));
});
