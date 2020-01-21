import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestorService } from '../services/investor.service';

@Component({
  selector: 'investor',
  template: `
  <main class="mainPage">
  <section class="tabsInvestorPage">
  <img class="logoImage" src="assets/cleverNB.png" />
    <h6 class="investorGroupHeading" *ngFor="let investor of investorArray">Accounts held for: {{investor.name + " " + investor.surname}}</h6>
    <table>
      <tr>
        <th>ACCOUNT ID</th>
        <th>TYPE</th>
        <th>BALANCE HELD</th>
        <th>DATE CREATED</th>
      </tr>
      <tr *ngFor="let account of investorAccounts" class="investorRows">
        <td>{{account.accountId}}</td>
        <td>{{account.type}}</td>
        <td>{{account.amountHeld | currency:'GBP':true:'4.2-2'}}</td>
        <td>{{account.dateCreated | date: 'dd/MM/yyyy'}}</td>
      </tr>
    </table>
    <div class="form-group" id="individualInvestorFormGroup">
      <label>Add Account: </label>
      <select #accountSelect class="form-control">
        <option value="" disabled selected class="optionDefault">Select type</option>
        <option value="Bond">Bond</option>
        <option value="GIA">GIA</option>
        <option value="ISA">ISA</option>
        <option value="Pension">Pension</option>
      </select>
      <label>Opening Balance: </label>
      <input name="balanceInputArea" type="text" class="form-control" #balanceInputTextBox placeholder="Add balance" (keyup.enter)="addAccountClick(balanceInputTextBox.value)" [(ngModel)]="balanceInput"/>
    </div>
    <div id="individualInvestorFormGroupPadding">
    <div class="warningMessage" *ngIf="detailError === true">Warning: Ensure account type and balance have been added</div>
    </div>
    <button class="btn btn-info" (click)="addAccountClick(balanceInputTextBox.value, accountSelect.options[accountSelect.selectedIndex].value)">Add Account</button>
    <button class="btn btn-info" routerLink="/investorList" routerLinkActive="active">Back to Investor List</button>
  </section>
</main>
<router-outlet></router-outlet>
                `
                    ,
  providers: [InvestorService]
})

export class InvestorInfoComponent {
  investorId: string;
  investorArray: Object[];
  investorAccounts: Object[];
  newAccountId: number;
  balanceInput: string = "";
  detailError: boolean = false;

  constructor(private investorService: InvestorService, private route: ActivatedRoute) {

    this.investorId = this.route.snapshot.paramMap.get('id');
    this.investorService.getInvestorById(this.investorId).subscribe(investorResponse => {
      this.investorArray = [].concat(investorResponse);

    })

    this.investorService.getInvestorAccountsById(this.investorId).subscribe(accountsResponse => {
      this.investorAccounts = accountsResponse;
    })
  }

  addAccountClick(balanceValue: string, accountType: string) {
    this.balanceInput = "";
    this.detailError = false;
    if (balanceValue.length <= 0 || accountType.length <= 0) {
        this.detailError = true;
      return;
    } 
    const accountObj = {
      accountId: 0,
      investorId: 0,
      amountHeld: 0,
      type: "",
      dateCreated: new Date().toISOString()
    }

    this.investorService.getTotalAccounts().subscribe(accountsResponse => {

      accountObj.accountId = accountsResponse.length + 1;
      accountObj.amountHeld = parseFloat(parseFloat(balanceValue).toFixed(2));
      accountObj.type = accountType;

      this.investorAccounts.push(accountObj);

    })

    this.investorService.addInvestorAccount(accountObj.accountId, accountObj).subscribe(res => {})
  }
}


