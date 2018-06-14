import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as Chart from "chart.js";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.init();
  }
  @ViewChild("bar") bar;
  context: CanvasRenderingContext2D;

  amount:number;
  init(completionRate, jobNumber, totalAmount) {
    this.amount=totalAmount;
    console.log('bar : ' + jobNumber);
    console.log('bar : ' + completionRate);
    let canvas = this.bar.nativeElement;
    this.context = canvas.getContext("2d");
    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontSize = 30;
    Chart.defaults.global.defaultFontFamily = "Microsoft JhengHei";
    // Chart.defaults.global.defaultFontStyle = "normal";
    Chart.defaults.global.animation.duration=0;

    // Chart.defaults.global.tooltips.enabled=false;
    Chart.defaults.global.elements.rectangle.borderWidth = 2;
    // Chart.defaults.global.elements.rectangle.borderColor = 'black'

    Chart.defaults.scale.gridLines.color = "#555";

    var chart = new Chart(this.context, {
      type: 'horizontalBar',
      data: {
        labels: jobNumber,
        datasets: [
          {
            label: '計畫達成率 (%)',
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            data: completionRate,
            
          }
        ]
      },
      options: {
        legend: {
          display: false, 
        },
        title: {
          display: true,
          text: '計畫達成率 (%)',
        },
        
        maintainAspectRatio: false
      }
    });
  }


}
