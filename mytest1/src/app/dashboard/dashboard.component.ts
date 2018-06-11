import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { PieComponent } from '../pie/pie.component';
import * as moment from 'moment';
import { AppService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';

import { Fridge } from '../model/fridge';
import { Table } from '../model/table';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rfid: string[] = ['箱體發泡', '商檢異常出口', '裝配線入口', '裝配線出口'];
  reader_mac: string[] = ['rfid_1', 'rfid_2', 'rfid_3', 'rfid_4'];

  title: string;
  date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
  @ViewChild(PieComponent) pie: PieComponent;

  currentFridges: Fridge[] = [];
  output: Fridge[] = [];
  tables: Table[];
  totalAmount: number;
  totalTarge: number;
  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.title = this.rfid[id];
    this.totalAmount = 0;
    this.totalTarge = 0;
    this.getJobNumbers(this.reader_mac[id]);
    var loop = setInterval(() => {
      this.getJobNumbers(this.reader_mac[id]);
      this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
    }, 1000 * 30);
    // console.log(moment().hour(7).minute(50).second(0))
  }

  // ngAfterViewInit() {
  //   this.pie.drawPie(39 / 100, 0, 0, 0);
  // }

  getJobNumbers(reader_mac: string) {

    this.tables = [];

    this.appService.getJobNumbers(moment().format('YYYY-MM-DD'), reader_mac).subscribe(
      async elements => {
        console.log(elements);
        this.currentFridges = elements;

        if (this.currentFridges.length <= 3) {
          //compute output
          for (let i = 0; i < this.currentFridges.length; i++) {
            await this.getSection(this.currentFridges[i]);
            console.log(this.output);

            let table: Table = Table.CreateDefault();
            let acOuput = 0;
            let target = parseInt(this.currentFridges[i].target.toString());
            let maximumAmount = 0;
            for (let j = 0; j < this.output.length; j++) {
              if (this.output[j]) {//只使用到 amount
                let amount = parseInt(this.output[j].amount.toString());
                acOuput = amount - acOuput;
                table.acOutput.push(acOuput);
                if (amount > maximumAmount) maximumAmount = amount;
              }
              else {
                table.acOutput.push(0);
              }

              table.note.push('');
            }
            table.target.push((target * 130 / 460).toFixed());
            table.target.push((target * 100 / 460).toFixed());
            table.target.push((target * 140 / 460).toFixed());
            table.target.push((target - parseInt(table.target[0]) - parseInt(table.target[1]) - parseInt(table.target[2])).toFixed());
            console.log(table);
            this.tables.push(table);

            this.totalAmount += maximumAmount;
            this.totalTarge += parseInt(this.currentFridges[i].target.toString());
          }
          for (let i = 0; i <= 3 - this.currentFridges.length; i++)
            this.currentFridges.push(Fridge.CreateDefault());
          console.log(this.tables);
        }
        this.pie.drawPie(this.totalAmount / this.totalTarge, 0, 0, 0);
      }
    )
  }

  getSection(tmpFridge: Fridge) {
    let currentTime = moment().format('YYYY-MM-DD');

    let currenTarge = 0;
    return new Promise((resolve, reject) => {
      try {
        // let obj :Fridge[]= [];
        this.appService.getFridges(currentTime, tmpFridge.reader_mac, tmpFridge.job_number).subscribe(
          fridges => {
            this.output = fridges;
            resolve(fridges);
          })

      }
      catch (error) {
        reject(error);
      }
    });
  }




}
