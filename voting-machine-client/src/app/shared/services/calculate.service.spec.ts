/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { CalculateService } from './calculate.service';
import { AppModule } from '../../app.module';
import { Http, Response, Headers, RequestOptions, RequestMethod, XHRBackend, ResponseOptions } from '@angular/http';
describe('CalculateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        CalculateService,
        { provide: XHRBackend, useClass: MockBackend }]
    });
  });
  it('should create calculate.service', inject([CalculateService], (service: CalculateService) => {
    expect(service instanceof CalculateService).toBeTruthy();
  }));
  it('Should instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    const service = new CalculateService(http);
    expect(service instanceof CalculateService).toBe(true, 'new service should be ok');
  }));
  it('should sum answer values', inject([CalculateService], (service: CalculateService) => {
    const value = [{
      answer_id: 2,
      question: 'test',
      answer_A: 1,
      answer_B: 1,
      answer_C: 1,
      answer_D: 1,
    }];
    const value1 = [{
      answer_id: 2,
      question: 'test',
      answer_A: 5,
      answer_B: 0,
      answer_C: 0,
      answer_D: 2,
    }];
    const value2 = [{
      answer_id: 2,
      question: 'test',
      answer_A: 2,
      answer_B: 3,
      answer_C: 4,
      answer_D: 5,
    },
    {
      answer_id: 2,
      question: 'test',
      answer_A: 2,
      answer_B: 8,
      answer_C: 4,
      answer_D: 5,
    }];
    expect(service.sumAnswerValues(value)).toEqual([4]);
    expect(service.sumAnswerValues(value1)).toEqual([7]);
    expect(service.sumAnswerValues(value2)).toEqual([14, 19]);
  }));
  it('should convert to percentage', inject([CalculateService], (service: CalculateService) => {
    const value = [{
      answer_id: 1,
      question: 'test1',
      answer_A: 1,
      answer_B: 2,
      answer_C: 1,
      answer_D: 1,
    }];
    const value1 = [{
      answer_id: 2,
      question: 'test2',
      answer_A: 5,
      answer_B: 0,
      answer_C: 0,
      answer_D: 2,
    }];
    const value2 = [{
      answer_id: 3,
      question: 'test3',
      answer_A: 2,
      answer_B: 3,
      answer_C: 4,
      answer_D: 5,
    },
    {
      answer_id: 4,
      question: 'test4',
      answer_A: 2,
      answer_B: 8,
      answer_C: 4,
      answer_D: 5,
    }];
    service.convertToPercentage(value);
    service.convertToPercentage(value1);
    service.convertToPercentage(value2);
    expect(value).toEqual([{
      answer_id: 1,
      question: 'test1',
      answer_A: '20.00',
      answer_B: '40.00',
      answer_C: '20.00',
      answer_D: '20.00',
    }]);
    expect(value1).toEqual([{
      answer_id: 2,
      question: 'test2',
      answer_A: '71.43',
      answer_B: '0.00',
      answer_C: '0.00',
      answer_D: '28.57',
    }]);
    expect(value2).toEqual([{
      answer_id: 3,
      question: 'test3',
      answer_A: '14.29',
      answer_B: '21.43',
      answer_C: '28.57',
      answer_D: '35.71',
    },
    {
      answer_id: 4,
      question: 'test4',
      answer_A: '10.53',
      answer_B: '42.11',
      answer_C: '21.05',
      answer_D: '26.32',
    }]);
  }));
});
