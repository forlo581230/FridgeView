import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { PieComponent } from './pie/pie.component';
import * as moment from 'moment';
import { AppService } from './services/app.service';
// import { element } from 'protractor';

import { Fridge } from './model/fridge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() { }
  
    ngOnInit() {
    }
}
