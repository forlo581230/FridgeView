import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css']
})
export class BufferComponent implements OnInit {

  wip: number = -1;

  constructor() { }

  ngOnInit() {
    this.counter_time=0;
    this.position_1();
  }
  counter_time: number;
  second: number = 1;
  position_1() {
    var loop = setInterval(() => {
      switch (this.counter_time) {
        case 10:
          this.wip = 1;
          break;
        case 10 + 87:
          this.wip = -1;
          this.counter_time=0;
          break;
        default:
          break;
      }

      this.counter_time++;
    }, 1000 * this.second);
  }

}
