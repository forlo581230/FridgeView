import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Fridge} from '../model/fridge';
import { Util } from './util';

@Injectable()
export class AppService {

  oUtil = new Util();
  constructor(private http:Http) { }

  getData(start: any, mac: any): Observable<Fridge[]> {
    let params: URLSearchParams = new URLSearchParams();
    // params.set('name', searchCriteria);
    params.set('start',start);
    params.set('mac',mac);

    return this.http.get(this.oUtil.serverUrl + ':4000/getData', { search: params })
      .map((res: any) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json ? error.json().error : error || 'Server error')
      });
  }
}
