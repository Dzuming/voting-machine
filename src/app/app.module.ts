import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VotingMachineComponent } from './voting-machine/voting-machine.component';
import { HeaderComponent } from './shared/header/header.component';
import { VotingMachineChartComponent } from './voting-machine/voting-machine-chart.component';
import { VotingMachineTableComponent } from './voting-machine/voting-machine-table.component';

@NgModule({
  declarations: [
    AppComponent,
    VotingMachineComponent,
    HeaderComponent,
    VotingMachineChartComponent,
    VotingMachineTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
