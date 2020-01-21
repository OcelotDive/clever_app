import { Component } from '@angular/core';
import { InvestorService } from '../services/investor.service';


@Component({
  selector: 'investorList',
  template: `
  <main class="mainPage">
  <section class="tabs">
    <ng-container *ngFor="let investorGroup of investorsArray; let i = index">
      <input name="tabs" type="radio" [attr.id]="'tab' + i" checked="checked" class="radioInput" />
      <label [attr.for]="'tab' + i" class="tabLabel" [class.tabLabelOff]="hasUserSearched && investorsArray[0].length > 0">{{investorGroup[0].investorId}}-{{investorGroup[investorGroup.length - 1].investorId}}</label>
      <div class="panel">
        <img class="logoImage" src="assets/cleverNB.png" />
        <div class="form-group row" id="formGroup">
          <div class="col-xs-4">
            <label for="searchInputText" class="searchLabel">Investor Search: </label>
            <input name="searchArea" type="text" class="form-control"  #searchInputTextBox placeholder="Name or Surname" (keyup.enter)="onSearchClick(searchInputTextBox.value)" [(ngModel)]="searchInput" />
            <button class="btn btn-info" (click)="onSearchClick(searchInputTextBox.value)">Search</button>
            <button class="btn btn-info" (click)="onClearSearchClick()">Clear</button>
          </div>
        </div>
        <h6 class="investorGroupHeading">Investor Group: {{this.hasUserSearched === true ? "Custom Search" : 10 - i}}</h6>
        <table>
          <tr>
            <th>ID</th>
            <th>SURNAME</th>
            <th>NAME</th>
            <th>DATE</th>
          </tr>
          <tr *ngFor="let investor of investorGroup" class="investorRows" routerLink="/investor/{{investor.investorId}}" routerLinkActive="active">
            <td>{{investor.investorId}}</td>
            <td>{{investor.surname}}</td>
            <td>{{investor.name}}</td>
            <td>{{investor.dateCreated | date: 'dd/MM/yyyy'}}</td>
          </tr>
        </table>
        <button class="btn btn-success" id="reportButton" routerLink="/accountBreakdown" routerLinkActive="active">Overall Report</button>
      </div>
    </ng-container>
  </section>
</main>
<router-outlet></router-outlet>
                `
                    ,
  providers: [InvestorService]
})

export class InvestorListComponent {
  investorsArray: Investor[][];
  searchArray: Investor[] = [];
  searchInput: string = '';
  hasUserSearched: boolean = false;
  fullImagePath: string;


  constructor(private investorService: InvestorService) {

    this.investorService.getInvestors().subscribe(investorResponse => {
      this.investorsArray = this.selectionPages(investorResponse, 10).reverse();
    })
  }

  selectionPages(investorArray: Investor[], amountPerSection: number): Investor[][] {
    let pageArray = [], i, j;
    for (i = 0, j = -1; i < investorArray.length; i++) {
      if (i % amountPerSection === 0) {
        j++;
        pageArray[j] = [];
      }
      pageArray[j].push(investorArray[i]);
    }
    return pageArray;
  }

  onSearchClick(value: string) {
    if (value === "") return;
    const searchValue = this.capitilize(value);

    this.investorService.searchInvestorsByName(searchValue).subscribe(
      investorResponse => this.investorsArray = this.selectionPages(investorResponse, 10),
      err => {
        throw (err)
      }
    );

    this.investorService.searchInvestorsBySurnameName(searchValue).subscribe(
      investorResponse => this.investorsArray = this.selectionPages(investorResponse, 10),
      err => {
        throw (err)
      }
    )
    this.hasUserSearched = value === "" ? false : true;

  }

  onClearSearchClick() {
    this.searchInput = "";
    this.investorService.getInvestors().subscribe(investorResponse => {
      this.investorsArray = this.selectionPages(investorResponse, 10).reverse();
    })
    setTimeout(() => {
    this.hasUserSearched = false;
    }, 1000)
  }

  capitilize(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}

interface Investor {
  investorId: number;
  name: string;
  surname: string;
  dateCreated: string;
}
