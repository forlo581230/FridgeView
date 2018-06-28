import { Component, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
// import { PieComponent } from '../pie/pie.component';
import { BarComponent } from '../bar/bar.component';
import { WipDashboardComponent } from '../wip-dashboard/wip-dashboard.component';
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
  rfid: string[] = ['', '箱體發泡', '商檢異常出口', '裝配線入口', '裝配線出口'];
  reader_mac: string[] = ['', 'rfid_1', 'rfid_2', 'rfid_3', 'rfid_4'];
  title: string;
  date: string;
  counter_time: number;
  counter_index: number;
  wip: boolean = false;
  // obj: object;

  // @ViewChild(PieComponent) pie: PieComponent;
  @ViewChild(BarComponent) bar: BarComponent;
  @ViewChild(WipDashboardComponent) WipDashboard: WipDashboardComponent;
  id: number;

  currentFridges: Fridge[] = [];  //current jobNumbers
  output: Fridge[] = [];          //current outputs
  tables: Table[];
  showcurrentFridges: Fridge[] = [];  //current jobNumbers
  showtables: Table[];
  totalAmount: number;
  totalTarge: number;
  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) { }

  second: number = 1;
  position_1() {
    var loop = setInterval(() => {
      switch (this.counter_time) {
        case 15:
          if (this.currentFridges.length > 3) {
            this.counter_index += 3;
            this.showcurrentFridges = this.currentFridges.slice(this.counter_index, this.counter_index + 3);
            this.showtables = this.tables.slice(this.counter_index, this.counter_index + 3);
            this.showjobNumber = this.jobNumber.slice(this.counter_index, this.counter_index + 3);
            this.showcompletionRate = this.completionRate.slice(this.counter_index, this.counter_index + 3);
            this.bar.init(this.showcompletionRate, this.showjobNumber, this.totalAmount);
          }
          break;
        case 30:
          this.id = 6;
          this.wip = true;
          break;
        case 40:
          this.title = this.rfid[3];
          this.getJobNumbers(this.reader_mac[3]);
          this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
          this.counter_index = 0;
          this.wip = false;
          break;
        case 50:
          this.title = this.rfid[4];
          this.getJobNumbers(this.reader_mac[4]);
          this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
          this.counter_index = 0;
          this.wip = false;
          break;
        case 60:
          this.title = this.rfid[1];
          this.getJobNumbers(this.reader_mac[1]);
          this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
          this.counter_time = 0;
          this.counter_index = 0;
          this.wip = false;
          break;
        default:
          break;
      }

      this.counter_time++;
    }, 1000 * this.second);
  }
  position_2() {
    var loop = setInterval(() => {
      switch (this.counter_time) {
        case 15:
          if (this.currentFridges.length > 3) {
            this.counter_index += 3;
            this.showcurrentFridges = this.currentFridges.slice(this.counter_index, this.counter_index + 3);
            this.showtables = this.tables.slice(this.counter_index, this.counter_index + 3);
            this.showjobNumber = this.jobNumber.slice(this.counter_index, this.counter_index + 3);
            this.showcompletionRate = this.completionRate.slice(this.counter_index, this.counter_index + 3);
            this.bar.init(this.showcompletionRate, this.showjobNumber, this.totalAmount);
          }
          break;
        case 30:
          this.title = this.rfid[1];
          this.getJobNumbers(this.reader_mac[1]);
          this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
          this.counter_index = 0;
          break;
        case 40:
          this.id = 6;
          this.wip = true;
          break;
        case 50:
          this.id = 8;
          this.wip = true;
          break;
        case 60:
          this.title = this.rfid[3];
          this.getJobNumbers(this.reader_mac[3]);
          this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
          this.counter_time = 0;
          this.counter_index = 0;
          this.wip = false;
          break;
        default:
          break;
      }

      this.counter_time++;
    }, 1000 * this.second);
  }
  position_3() {
    var loop = setInterval(() => {
      switch (this.counter_time) {
        case 15:
          if (this.currentFridges.length > 3) {
            this.counter_index += 3;
            this.showcurrentFridges = this.currentFridges.slice(this.counter_index, this.counter_index + 3);
            this.showtables = this.tables.slice(this.counter_index, this.counter_index + 3);
            this.showjobNumber = this.jobNumber.slice(this.counter_index, this.counter_index + 3);
            this.showcompletionRate = this.completionRate.slice(this.counter_index, this.counter_index + 3);
            this.bar.init(this.showcompletionRate, this.showjobNumber, this.totalAmount);
          }
          break;
        case 30:
          this.id = 6;
          this.wip = true;
          break;
        case 40:
          this.id = 7;
          this.wip = true;
          break;
        case 50:
          this.id = 8;
          this.wip = true;
          break;
        case 60:
          this.getJobNumbers(this.reader_mac[4]);
          this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
          this.counter_time = 0;
          this.counter_index = 0;
          this.wip = false;
          break;
        default:
          break;
      }
      this.counter_time++;
    }, 1000 * this.second);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.title = this.rfid[id];
    this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
    this.counter_time = 0;
    this.counter_index = 0;

    this.getJobNumbers(this.reader_mac[id]);

    switch (id) {
      case 1:
        this.position_1();
        break;
      case 3:
        this.position_2();
        break;
      case 4:
        this.position_3();
        break;
    }

    // Bar chart
  }
  // ngAfterViewInit() {
  //   this.pie.drawPie(39 / 100, 0, 0, 0);
  // }

  completionRate: number[];
  jobNumber: string[];
  showcompletionRate: number[];
  showjobNumber: string[];
  getJobNumbers(reader_mac: string) {
    this.totalAmount = 0;
    this.totalTarge = 0;
    //get all jobNumber
    this.appService.getJobNumbers(moment().format('YYYY-MM-DD'), reader_mac).subscribe(
      async elements => {
        this.tables = [];
        this.completionRate = [];
        this.jobNumber = [];

        console.log(elements);
        let numJob = elements.length;
        this.currentFridges = elements;

        // if (numJob <= 3) {
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
            if (this.output[j]) {
              //只使用到 amount
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
        console.log('num:' + numJob);
        // for (let i = 2; i < numJob%4%3+4; i++) {
        for (let i = 0; i < (numJob % 3 - 3) * -1; i++) {
          this.currentFridges.push(Fridge.CreateDefault());
          this.tables.push(Table.CreateEmpty());
        }
        if (this.completionRate.length == 0) {
          this.completionRate = [100, 100, 100];
          this.jobNumber = ['?', '?', '?'];
        }
        console.log(this.tables);

        //一次取三份
        this.showtables = this.tables.slice(this.counter_index, this.counter_index + 3);
        this.showcurrentFridges = this.currentFridges.slice(this.counter_index, this.counter_index + 3);
        this.showjobNumber = this.jobNumber.slice(this.counter_index, this.counter_index + 3);
        this.showcompletionRate = this.completionRate.slice(this.counter_index, this.counter_index + 3);
        // }
        //更新圖表
        // this.pie.drawPie(this.totalAmount / this.totalTarge, 0, 0, 0, this.totalAmount.toString());
        this.bar.init(this.showcompletionRate, this.showjobNumber, this.totalAmount);
      }
    )
  }

  //get all time section
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






}
