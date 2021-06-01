import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  constructor(public http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url).pipe(map(res => this.setPayload(res)))
      .pipe(catchError((err) => {
        return of(err);
      }));
  }

  setPayload(retObj) {
    return retObj || {};
  }
}
