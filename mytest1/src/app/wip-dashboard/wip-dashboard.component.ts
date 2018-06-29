import { Component, OnInit ,Input } from '@angular/core';
import { BarComponent } from '../bar/bar.component';
import * as moment from 'moment';

import { AppService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';

import { Fridge } from '../model/fridge';
import { Table } from '../model/table';

@Component({
  selector: 'app-wip-dashboard',
  templateUrl: './wip-dashboard.component.html',
  styleUrls: ['./wip-dashboard.component.css']
})
export class WipDashboardComponent implements OnInit {
  rfid: string[] = ['', '', '', '', '', '', '後倉內暫存數量', '裝配線上數量', '異常Buffer數量'];
  reader_mac: string[] = ['', '', '', '', '', '', 'rfid_6', 'rfid_7', 'rfid_8'];
  title: string;
  date: string;
  counter_time: number;
  counter_index: number;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) { }

  currentFridges: Fridge[] = [];  //current jobNumbers
  output: Fridge[] = [];          //current outputs
  tables: Table[];
  showcurrentFridges: Fridge[] = [];  //current jobNumbers
  showtables: Table[];
  totalAmount: number;
  totalTarge: number;
  @Input()id: number;

  ngOnInit() {
    if (!this.id)
      this.id = +this.route.snapshot.paramMap.get('id');
    this.title = this.rfid[this.id];
    this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
    this.counter_time = 0;
    this.counter_index = 0;
    this.totalAmount = 0;
    this.totalTarge = 0;

    this.getJobNumbers(this.reader_mac[this.id]);

    var loop = setInterval(() => {
      switch (this.counter_time) {
        case 30:
          this.getJobNumbers(this.reader_mac[this.id]);
          this.totalAmount = 0;
          this.totalTarge = 0;
          this.date = moment().format('日期: YYYY-MM-DD 時間: HH時mm分');
          this.counter_time = 0;
          this.counter_index = 0;
          break;
        case 10:
          if (this.currentFridges.length > 6) {
            this.counter_index += 6;
            this.showcurrentFridges = this.currentFridges.slice(this.counter_index, this.counter_index + 6);
            this.showtables = this.tables.slice(this.counter_index, this.counter_index + 6);
            this.showjobNumber = this.jobNumber.slice(this.counter_index, this.counter_index + 6);
            this.showcompletionRate = this.completionRate.slice(this.counter_index, this.counter_index + 6);
          }
          break;
        default:
          break;
      }

      this.counter_time++;
    }, 1000 * 1);
  }

  completionRate: number[];
  jobNumber: string[];
  showcompletionRate: number[];
  showjobNumber: string[];
  getJobNumbers(reader_mac: string) {

    //get all jobNumber
    this.appService.getJobNumbers(moment().format('YYYY-MM-DD'), reader_mac).subscribe(
      async elements => {
        this.tables = [];
        this.completionRate = [];
        this.jobNumber = [];

        console.log('目前工號數量:');
        console.log(elements);

        let numJob = elements.length;
        this.currentFridges = elements;

        // if (numJob <= 3) {
        //compute output
        for (let i = 0; i < numJob; i++) {
          await this.getSection(this.currentFridges[i]);
          console.log('五個時段 : ');
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
              let diffOuput = amount - acOuput;
              table.acOutput.push(diffOuput);
              // if (amount > maximumAmount) maximumAmount = amount;
              maximumAmount += diffOuput;
              acOuput = amount;
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

          // console.log(table);
          this.tables.push(table);
          this.totalAmount += maximumAmount;

          this.totalTarge += parseInt(this.currentFridges[i].target.toString());

          this.completionRate.push(parseInt((maximumAmount / parseInt(this.currentFridges[i].target.toString()) * 100).toFixed()));
          this.jobNumber.push(this.currentFridges[i].job_number.toString());
          // this.jobNumber.push('工號 ('+(i+1).toString()+')');
        }
        // for (let i = 2; i < numJob%4%3+4; i++) {
        for (let i = 0; i < (numJob % 6 - 6) * -1; i++) {
          this.currentFridges.push(Fridge.CreateDefault());
          this.tables.push(Table.CreateEmpty());
        }
        if (this.completionRate.length == 0) {
          this.completionRate = [100, 100, 100];
          this.jobNumber = ['?', '?', '?'];
        }
        console.log('table');
        console.log(this.tables);

        //一次取6份
        this.showtables = this.tables.slice(this.counter_index, this.counter_index + 6);
        this.showcurrentFridges = this.currentFridges.slice(this.counter_index, this.counter_index + 6);
        this.showjobNumber = this.jobNumber.slice(this.counter_index, this.counter_index + 6);
        this.showcompletionRate = this.completionRate.slice(this.counter_index, this.counter_index + 6);
        // }
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
