import {Component, OnInit} from '@angular/core';
import {Customer} from './customer.model';
import {Country} from './country.model';
import {CustomersService} from './customers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jumia-test';
  customers: Customer[];
  countries: string[];
  states: { label: string, value: string }[] = [{
    label: 'valid',
    value: 'OK',
  }, {
    label: 'Not valid',
    value: 'NOK',
  }];

  countryName: string;
  state: string;

  constructor(
    private customersService: CustomersService,
  ) {
  }

  ngOnInit(): void {
    this.getCountries();
    this.getCustomers();
  }

  getCountries(): void {
    this.customersService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  getCustomers(): void {
    const query: any = {};

    if (this.countryName) {
      query.country = this.countryName;
    } else {
      this.state = null;
    }

    if (typeof this.state === 'string') {
      query.state = this.state;
    }

    this.customersService.getCustomers(query).subscribe(customers => {
      this.customers = customers;
    });
  }
}
