import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { PieComponent } from '../pie/pie.component';
import * as moment from 'moment';
import { AppService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';

import { Fridge } from '../model/fridge';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rfid: string[] = ['箱體發泡', '商檢異常出口', '裝配線入口', '裝配線出口'];

  title: string;
  date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
  @ViewChild(PieComponent) pie: PieComponent;

  currentFridges: Fridge[] = [];
  outputFridges: Fridge[] = [];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.title = this.rfid[id];
    this.getData();
    // console.log(moment().hour(7).minute(50).second(0))
  }

  ngAfterViewInit() {
    this.pie.drawPie(39 / 100, 0, 0, 0);
    // console.log(this.pie)
  }

  getData() {
    this.appService.getData(moment().format('YYYY-MM-DD'), '00ac161215da').subscribe(
      elements => {
        console.log(elements);
        this.currentFridges = elements;

        if (this.currentFridges.length < 3) {
          let json = JSON.parse('{ "date" : "2018-06-04 10:06:40", "reader_mac" : "00ac161215da", "rfid_mac" : "E28011052000590438B908A6", "job_number" : "3000041795B", "model" : "R6181VXHS", "lot" : "500", "target" : "100", "amount" : "78"}');
          console.info(json);
          this.currentFridges.push(json);
          for (let i = 0; i <= 3 - this.currentFridges.length; i++)
            this.currentFridges.push(Fridge.CreateDefault());
        }
        // elements.forEach(elements => {

        //   this.outputFridges.push()
        // });

      }
    )
  }




}
