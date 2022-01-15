import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Country} from './country.model';
import {Customer} from './customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  config = environment;

  constructor(
    private http: HttpClient,
  ) { }

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.config.serverUrl}/countries`);
  }

  getCustomers(query: any): Observable<Customer[]> {
    const qs = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

    return this.http.get<Customer[]>(`${this.config.serverUrl}/customers?${qs}`);
  }
}
