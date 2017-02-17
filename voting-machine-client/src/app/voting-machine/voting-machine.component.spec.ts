/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VotingMachineComponent } from './voting-machine.component';

describe('VotingMachineComponent', () => {
  let component: VotingMachineComponent;
  let fixture: ComponentFixture<VotingMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
