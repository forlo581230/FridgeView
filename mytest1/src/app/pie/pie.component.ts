import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import * as $ from 'jquery';

const subCanvas = {
  "width": 200,
  "height": 200
}

const mainCanvas = {
  "width": 200,
  "height": 200
}

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  name:string = 'childName';

  @ViewChild('canvass') canvasRef: ElementRef;
  @ViewChild('a') aRef: ElementRef;
  @ViewChild('b') bRef: ElementRef;
  @ViewChild('c') cRef: ElementRef;
  


  constructor() { }

  ngOnInit() {
  }


  drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);

    ctx.closePath();
    ctx.fill();
  }

  mainPiechart(ctx, options) {
    var data = options.data;
    var options = options;
    var canvas = options.canvas;
    var color = options.color;
    var startAngle = -2 * Math.PI / 4;
    //outerArc
    this.drawPieSlice(
      ctx,
      canvas.width / 2,
      canvas.height / 2,
      1 * Math.min(canvas.width / 2, canvas.height / 2),
      0,
      2 * Math.PI,
      "gray"
    );
    //innerArc1
    this.drawPieSlice(
      ctx,
      canvas.width / 2,
      canvas.height / 2,
      0.9 * Math.min(canvas.width / 2, canvas.height / 2),
      0,
      2 * Math.PI,
      "rgba(220,220,220)"
    );

    var loop = setInterval(() => {
      //innerArc2
      var slice_angle = 2 * Math.PI * data;
      this.drawPieSlice(
        ctx,
        canvas.width / 2,
        canvas.height / 2,
        0.9 * Math.min(canvas.width / 2, canvas.height / 2),
        startAngle,
        startAngle + slice_angle,
        color
      );

      //drawing a white circle over the chart
      //to create the doughnut chart
      this.drawPieSlice(
        ctx,
        canvas.width / 2,
        canvas.height / 2,
        0.6 * Math.min(canvas.width / 2, canvas.height / 2),
        0,
        2 * Math.PI,
        "gray"
      );

      // ctx.fillStyle = color;
      // ctx.font = "1000 2vw Microsoft JhengHei";
      // ctx.fillText((data*100).toFixed(0)+'%', canvas.width / 2 - ctx.measureText("99%").width/2, canvas.height / 2);

      ctx.fillStyle = "white";
      ctx.font = "2vw Microsoft JhengHei";
      ctx.fillText((data*100).toFixed(0)+'%', canvas.width / 2 - ctx.measureText("99%").width/2, canvas.height / 2-15);

      ctx.fillStyle = "black";
      ctx.font = "1.5vw Microsoft JhengHei";
      ctx.fillText("計畫達成率", canvas.width / 2 - ctx.measureText("計畫達成率").width/2, canvas.height / 2 +20);
      document.getElementById("ca").innerText="text";
      if (data >= options.data) clearInterval(loop);
      data += 0.01;
    }, 30);
  }

  subPiechart(ctx, options) {
    var data = options.data;
    var options = options;
    var canvas = options.canvas;
    var color = options.color;
    var startAngle = -2 * Math.PI / 4;

    this.drawPieSlice(
      ctx,
      canvas.width / 2,
      canvas.height / 2,
      0.95 * Math.min(canvas.width / 2, canvas.height / 2),
      0,
      2 * Math.PI,
      "rgba(0, 0, 0, 0.1)"
    );

    var loop = setInterval(() => {



      //innerArc2
      var slice_angle = 2 * Math.PI * data;
      this.drawPieSlice(
        ctx,
        canvas.width / 2,
        canvas.height / 2,
        0.95 * Math.min(canvas.width / 2, canvas.height / 2),
        startAngle,
        startAngle + slice_angle,
        color
      );

      //drawing a white circle over the chart
      //to create the doughnut chart
      this.drawPieSlice(
        ctx,
        canvas.width / 2,
        canvas.height / 2,
        0.85 * Math.min(canvas.width / 2, canvas.height / 2),
        0,
        2 * Math.PI,
        "white"
      );
      ctx.fillStyle = "black";
      ctx.font = "2vw Microsoft JhengHei";
      ctx.fillText((data*100).toFixed(0)+'%', canvas.width / 2 - ctx.measureText("99%").width/2, canvas.height / 2-15);

      ctx.fillStyle = color;
      // ctx.font = "solid 2vw Microsoft JhengHei";
      ctx.fillText(options.text, canvas.width / 2 - ctx.measureText(options.text).width/2, canvas.height / 2 +25);
      if (data >= options.data) clearInterval(loop);
      data += 0.01;
    }, 30);
  }


  drawPie(d1: number, d2: number, d3: number, d4: number) {
    this.mainPiechart(this.canvasRef.nativeElement.getContext('2d'),
      {

        canvas: mainCanvas,
        data: d1,
        color: "rgb(0, 162, 255)",
        doughnutHoleSize: 0.8
      }
    );


    this.subPiechart(this.aRef.nativeElement.getContext('2d'),
      {
        canvas: subCanvas,
        data: 0.99,
        color: "rgb(0, 200, 50)",
        doughnutHoleSize: 0.8,
        text:"移工效率"
      }
    );

    this.subPiechart(this.bRef.nativeElement.getContext('2d'),
      {
        canvas: subCanvas,
        data: 0.99,
        color: "rgb(250, 100, 0)",
        doughnutHoleSize: 0.8,
        text:"品質良率"
      });

    // this.subPiechart(this.cRef.nativeElement.getContext('2d'),
    //   {
    //     canvas: subCanvas,
    //     data: 0.2,
    //     color: "rgba(0, 0, 255)",
    //     doughnutHoleSize: 0.8
    //   });
  }


}
