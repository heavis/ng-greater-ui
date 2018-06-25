import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  rangeContext: any;

  constructor() {
    this.rangeContext = {
      name: 'Speed',
      min: 0,
      max: 100,
      val1: null,
      val2: null
    };
  }

  rangeValueChanged(data): void {
    console.log(data);
  }
}
