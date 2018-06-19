import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
// import { PieComponent } from '../pie/pie.component';
import { BarComponent } from '../bar/bar.component';
import * as moment from 'moment';

import { AppService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';

import { Fridge } from '../model/fridge';
import { Table } from '../model/table';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rfid: string[] = ['箱體發泡', '商檢異常出口', '裝配線入口', '裝配線出口'];
  reader_mac: string[] = ['rfid_1', 'rfid_2', 'rfid_3', 'rfid_4'];

  title: string;
  date: string;
  obj: object;
  // @ViewChild(PieComponent) pie: PieComponent;
  @ViewChild(BarComponent) bar: BarComponent;
  //test
  table: Table;

  currentFridges: Fridge[] = [];
  output: Fridge[] = [];
  tables: Table[];
  showtables: Table[];
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
    this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
    this.getJobNumbers(this.reader_mac[id]);

    var loop = setInterval(() => {
      this.getJobNumbers(this.reader_mac[id]);
      this.totalAmount = 0;
      this.totalTarge = 0;
      this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
    }, 1000 * 30);
    // console.log(moment().hour(7).minute(50).second(0))

    // Bar chart


  }

  // ngAfterViewInit() {
  //   this.pie.drawPie(39 / 100, 0, 0, 0);
  // }

  getSection(tmpFridge: Fridge) {
    let currentTime = moment().format('YYYY-MM-DD');
    let currenTarge = 0;
    return new Promise((resolve, reject) => {
      try {
        // let obj :Fridge[]= [];
        this.appService.getFridges(currentTime, tmpFridge.reader_mac, tmpFridge.job_number).subscribe(
          fridges => {
            this.output = (fridges);
            resolve(fridges);
          })

      }
      catch (error) {
        reject(error);
      }
    });
  }

  completionRate: number[];
  jobNumber: string[];
  getJobNumbers(reader_mac: string) {

    this.appService.getJobNumbers(moment().format('YYYY-MM-DD'), reader_mac).subscribe(
      async elements => {
        this.tables = [];
        this.completionRate = [];
        this.jobNumber = [];

        console.log(elements);
        let numJob = elements.length;
        this.currentFridges = elements;

        if (numJob <= 3) {
          //compute output
          for (let i = 0; i < numJob; i++) {
            await this.getSection(this.currentFridges[i]);
            console.log(this.output);

            let table: Table = Table.CreateDefault();
            let acOuput = 0;
            let target = parseInt(this.currentFridges[i].target.toString());
            let maximumAmount = 0;
            //this.output.length==4
            for (let j = 0; j < this.output.length; j++) {
              if (this.output[j]) {//只使用到 amount
                let amount = parseInt(this.output[j].amount.toString());
                acOuput = amount - acOuput;
                table.acOutput.push(acOuput);
                // if (amount > maximumAmount) maximumAmount = amount;
                maximumAmount += acOuput;
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

            // acOuput = 0;
            // target = 0;
            // for (let index = 0; index < table.target.length; index++) {
            //   acOuput += table.acOutput[index]
            //   target += parseInt(table.target[index])
            //   if (acOuput > target) {
            //     table.note[index] = '正常'
            //   }
            // }
            // table.acOutput.push(maximumAmount);
            console.log(table);
            this.tables.push(table);
            this.totalAmount += maximumAmount;

            this.totalTarge += parseInt(this.currentFridges[i].target.toString());

            this.completionRate.push(parseInt((maximumAmount / parseInt(this.currentFridges[i].target.toString()) * 100).toFixed()));
            this.jobNumber.push(this.currentFridges[i].job_number.toString());
            // this.jobNumber.push('工號 ('+(i+1).toString()+')');
          }

          for (let i = 0; i < 3 - numJob; i++) {
            this.currentFridges.push(Fridge.CreateDefault());
            this.tables.push(Table.CreateEmpty());
          }
          if (this.completionRate.length == 0) {
            this.completionRate = [100, 100, 100];
            this.jobNumber = ['?', '?', '?'];
          }
          console.log(this.tables);
          this.showtables = this.tables;
        }
        //更新圖表
        // this.pie.drawPie(this.totalAmount / this.totalTarge, 0, 0, 0, this.totalAmount.toString());
        this.bar.init(this.completionRate, this.jobNumber, this.totalAmount);
      }
    )
  }






}
