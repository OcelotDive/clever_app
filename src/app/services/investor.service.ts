import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class InvestorService {
    mainUrl: string;
    constructor(private http: Http) {
        this.mainUrl = 'https://cors-anywhere.herokuapp.com/https://cleverapih55rbap66neaxmfe.azurewebsites.net/';
        

    }

    getInvestors() {
        return this.http.get(`${this.mainUrl}api/Investors`)
            .map(res => res.json());
    }

    searchInvestorsByName(name: string) {
        return this.http.get(`${this.mainUrl}api/Investors/Getby?name=${name}`)
            .map(res => res.json())
    }

    searchInvestorsBySurnameName(surname: string) {
        return this.http.get(`${this.mainUrl}api/Investors/Getby?surname=${surname}`)
            .map(res => res.json());
    }

    getInvestorById(id: string){
        return this.http.get(`${this.mainUrl}api/Investors/${id}`)
            .map(res => res.json());
    }

    getInvestorAccountsById(id: string) {
        return this.http.get(`${this.mainUrl}api/Accounts/ByInvestorId/${id}`)
            .map(res => res.json());
    }

    getTotalAccounts() {
        return this.http.get(`${this.mainUrl}api/Accounts`)
            .map(res => res.json());
    }


    addInvestorAccount(id: number, account: Object) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
 
        return this.http.put(`${this.mainUrl}api/Accounts/${id}`, account, options )
            .map(res => res.json());
    }
    
}