import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { InvestorListComponent } from './components/investor.component';
import { InvestorInfoComponent } from './components/investorInfo.component';
import { ReportComponent } from './components/report.component';

@NgModule({
  imports:      [ BrowserModule,
                   HttpModule, 
                   FormsModule,
                   RouterModule.forRoot([
                    
                     {path: '', redirectTo: 'investorList', pathMatch: 'full' },
                     {path: 'investorList', component: InvestorListComponent},
                     {path: 'investor/:id', component: InvestorInfoComponent},
                     {path: 'accountBreakdown', component: ReportComponent}
                   ])
                  ],
  declarations: [ AppComponent, InvestorListComponent, InvestorInfoComponent, ReportComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
