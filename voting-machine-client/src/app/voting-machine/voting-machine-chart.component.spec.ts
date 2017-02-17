/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VotingMachineChartComponent } from './voting-machine-chart.component';

describe('VotingMachineChartComponent', () => {
  let component: VotingMachineChartComponent;
  let fixture: ComponentFixture<VotingMachineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingMachineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingMachineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
