import { Component, OnInit, Input } from '@angular/core';
import { Answer } from '../shared/models/answer.model';
@Component({
  selector: 'app-voting-machine-table',
  templateUrl: './voting-machine-table.component.html',
})
export class VotingMachineTableComponent implements OnInit {
  @Input()  answers:Answer[];
  constructor() { }

  ngOnInit() {
  }
}
