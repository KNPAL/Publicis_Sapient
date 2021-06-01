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
  yearArrayList = [{ value: '2006' }, { value: '2007' }, { value: '2008' }, { value: '2009' }, { value: '2010' }, { value: '2011' }, { value: '2012' }, { value: '2013' }, { value: '2014' }, { value: '2015' }, { value: '2016' }, { value: '2017' }, { value: '2018' }, { value: '2019' }, { value: '2020' }];
  booleanArrayList = ['True', 'False'];
  constructor(private httpCommonService: HttpCommonService) { }

  ngOnInit() {
    this.getProjectList();
  }

  onYearClick(year) {
    if (this.selectedyear === year.value) {
      this.selectedyear = '';
    } else {
      this.selectedyear = year.value;
    }
    console.log(this.selectedyear);
  }

  filterSelection(value, field) {
    switch (field) {
      case 'land':
        if (this.isLanded === value) {
          this.isLanded = '';
        } else {
          this.isLanded = value;
        }
        break;
      case 'launch':
        if (this.isLaunch === value) {
          this.isLaunch = '';
        } else {
          this.isLaunch = value;
        }
        break;
      default:
    }
  }

  filter() {
    let filterQueryParam = '&';
    const filterParam = {
      launch_success: this.getBoolean(this.isLaunch),
      land_success: this.getBoolean(this.isLanded),
      launch_year: this.selectedyear
    };

    for (const property in filterParam) {
      if (!!filterParam[property]) {
        filterQueryParam += `${property}=${filterParam[property]}&`;
      }
    }
    this.httpCommonService.get('https://api.spaceXdata.com/v3/launches?limit=100' + filterQueryParam.substring(0, filterQueryParam.length - 1)).subscribe((data) => {
      this.projectList = data;
    });
  }

  clearFilter() {
    this.selectedyear = '';
    this.isLanded = '';
    this.isLaunch = '';
    this.getProjectList();
  }

  getProjectList() {
    this.httpCommonService.get('https://api.spaceXdata.com/v3/launches?limit=100').subscribe((data) => {
      this.projectList = data;
    });
  }

  getBoolean(inputValue) {
    let retValue = '';
    if (inputValue.toUpperCase() === 'TRUE') {
      retValue = 'true';
    }

    if (inputValue.toUpperCase() === 'FALSE') {
      retValue = 'false';
    }
    return retValue;
  }

}
