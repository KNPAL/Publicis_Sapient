import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from './services/http-common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spaceX';
  projectList;
  selectedyear: string;
  isLaunch: string;
  isLanded: string;
  yearArrayList = [{ value: '2006' }, { value: '2007' }, { value: '2008' }, { value: '2009' },
  { value: '2010' }, { value: '2011' }, { value: '2012' }, { value: '2013' }, { value: '2014' },
  { value: '2015' }, { value: '2016' }, { value: '2017' }, { value: '2018' }, { value: '2019' },
  { value: '2020' }];
  booleanArrayList = ['True', 'False'];
  constructor(private httpCommonService: HttpCommonService) { }

  ngOnInit() {
    this.filter();
    this.setFilter();
  }

  onYearClick(year) {
    if (this.selectedyear === year.value) {
      this.selectedyear = '';
    } else {
      this.selectedyear = year.value;
    }
    sessionStorage.setItem('launch_year', this.selectedyear);
    this.filter();
  }

  filterSelection(value, field) {
    switch (field) {
      case 'land':
        if (this.isLanded === value) {
          this.isLanded = '';
        } else {
          this.isLanded = value;
        }
        sessionStorage.setItem('land_success', this.isLanded);
        break;
      case 'launch':
        if (this.isLaunch === value) {
          this.isLaunch = '';
        } else {
          this.isLaunch = value;
        }
        sessionStorage.setItem('launch_success', this.isLaunch);
        break;
      default:
    }
    this.filter();
  }

  filter() {
    let filterQueryParam = '&';
    const filterParam = {
      launch_success: this.getBoolean(sessionStorage.getItem('launch_success')),
      land_success: this.getBoolean(sessionStorage.getItem('land_success')),
      launch_year: sessionStorage.getItem('launch_year')
    };

    for (const property in filterParam) {
      if (!!filterParam[property]) {
        filterQueryParam += `${property}=${filterParam[property]}&`;
      }
    }
    this.httpCommonService.get('https://api.spaceXdata.com/v3/launches?limit=100' + filterQueryParam.
      substring(0, filterQueryParam.length - 1)).subscribe((data) => {
        this.projectList = data;
      });
  }

  setFilter() {
    if (!!sessionStorage.getItem('launch_success')) {
      this.isLaunch = sessionStorage.getItem('launch_success');
    }
    if (!!sessionStorage.getItem('land_success')) {
      this.isLanded = sessionStorage.getItem('land_success');
    }
    if (!!sessionStorage.getItem('launch_year')) {
      this.selectedyear = sessionStorage.getItem('launch_year');
    }
  }

  getBoolean(inputValue) {
    let retValue = '';
    if (inputValue && inputValue.toUpperCase() === 'TRUE') {
      retValue = 'true';
    }

    if (inputValue && inputValue.toUpperCase() === 'FALSE') {
      retValue = 'false';
    }
    return retValue;
  }

}
