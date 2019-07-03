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

  getJobNumbers(currentTime: any, reader_mac: any): Observable<Fridge[]> {
    let params: URLSearchParams = new URLSearchParams();
    // params.set('name', searchCriteria);
    params.set('currentTime',currentTime);
    params.set('reader_mac',reader_mac);

    return this.http.get(this.oUtil.serverUrl + ':4000/getJobNumbers', { search: params })
      .map((res: any) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json ? error.json().error : error || 'Server error')
      });
  }

  getFridges(currentTime: any,  reader_mac: any, job_number: any): Observable<Fridge[]> {
    let params: URLSearchParams = new URLSearchParams();
    // params.set('name', searchCriteria);
    params.set('currentTime',currentTime);
    params.set('reader_mac',reader_mac);
    params.set('job_number',job_number);

    return this.http.get(this.oUtil.serverUrl + ':4000/getFridges', { search: params })
      .map((res: any) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json ? error.json().error : error || 'Server error')
      });
  }
}
