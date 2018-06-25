import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNumeric} from '../util/util';

export interface RangeContext {
  name: string;
  min?: number;
  max?: number;
  val1?: any;
  val2?: any;
}

/**
 * nggu-dropdown-range
 */
@Component({
  selector: 'nggu-dropdown-range',
  exportAs: 'nggu-dropdown-range',
  template: `
    <div class="drop-down">
      <p class="drop-down-toggle" (click)="toggle($event)" [class.active]="dropMenuVisible">
                        <span class="drop-down-title">
                            {{dataSource.name}} {{formatHeaderName()}}
                        </span>
        <span class="arrow "></span>
      </p>
      <div class="drop-down-menu" [class.none]="!dropMenuVisible" (click)="$event.stopPropagation()">
        <div class="label-for-text">
          <span>Min</span><span>{{dataSource.min !== undefined ? '(>=' + dataSource.min + ')' : ''
          }}</span><span>:</span>
        </div>
        <div class="text-group">
          <input type="text" [(ngModel)]="dataSource._val1" (blur)="onRangeBlur()"
                 (keyup)="onRangeKeyup($event)">
        </div>
        <div class="label-for-text">
          <span>Max</span><span>{{dataSource.max ? '(<=' + dataSource.max + ')' : '' }}</span><span>:</span>
        </div>
        <div class="text-group">
          <input type="text" [(ngModel)]="dataSource._val2" (blur)="onRangeBlur()"
                 (keyup)="onRangeKeyup($event)">
        </div>
        <div class="error-group">
          <span>{{error}}</span>
        </div>
        <div class="btn-group">
          <div class="btn btn-primary" (click)="confirm()">Update</div>
          <div class="btn btn-secondary" (click)="discard()">Close</div>
        </div>
      </div>
    </div>
  `
})
export class NumRange implements OnInit {
  /**
   * @ignore
   */
  dropMenuVisible: boolean;
  /**
   * @ignore
   */
  error: string;
  /**
   * Provide data source for nggu-dropdown-range.
   *
   * @link RangeContext
   */
  @Input()
  dataSource: any;
  @Output()
  valuesChanged: EventEmitter<RangeContext> = new EventEmitter<RangeContext>();

  /**
   * @ignore
   */
  constructor() {
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.dataSource = this.dataSource || {};
    this.dataSource._val1 = this.dataSource.val1;
    this.dataSource._val2 = this.dataSource.val2;

    document.addEventListener('click', (event) => {
      this.dropMenuVisible = false;
      event.stopPropagation();
    });
  }
  /**
   * @ignore
   */
  formatHeaderName(): string {
    const joinArray: Array<any> = [this.dataSource.val1, this.dataSource.val2];
    if (isNumeric(joinArray[0]) && isNumeric(joinArray[1])) {
      return joinArray[0] + '~' + joinArray[1];
    } else if (isNumeric(joinArray[0])) {
      return '>=' + joinArray[0];
    } else  if (isNumeric(joinArray[1])) {
      return '<=' + joinArray[1];
    } else {
      return '';
    }
  }
  /**
   * @ignore
   */
  toggle(event): void {
    this.dropMenuVisible = !this.dropMenuVisible;

    event.stopPropagation();
  }
  /**
   * @ignore
   */
  onRangeBlur(): boolean {
    if (this.dataSource._val1) {
      if (!isNaN(this.dataSource._val1)) {
        if (!isNaN(this.dataSource.min) && parseFloat(this.dataSource._val1) < this.dataSource.min) {
          this.error = 'The \'Min\' value must be greater or equal to ' + this.dataSource.min;
          return false;
        }
      } else {
        this.error = 'The \'Min\' value must be number';
        return false;
      }
    }

    if (this.dataSource._val2) {
      if (!isNaN(this.dataSource._val2)) {
        if (!isNaN(this.dataSource.max) && parseFloat(this.dataSource._val2) > this.dataSource.max) {
          this.error = 'The \'Max\' value must be less or equal to ' + this.dataSource.max;
          return false;
        }
      } else {
        this.error = 'The \'Max\' value must be number';
        return false;
      }
    }
    this.error = null;

    return true;
  }
  /**
   * @ignore
   */
  onRangeKeyup(event: KeyboardEvent): void {
    if (event.keyCode === 13) { // Press 'Enter' key.
      if (!this.onRangeBlur()) {
        return;
      }
      this.confirm();
    }
  }
  /**
   * @ignore
   */
  confirm(): void {
    let val1: number, val2: number;
    if (this.error) {
      return;
    }
    if (isNumeric(this.dataSource._val1)) {
      val1 = Number(this.dataSource._val1);
    }
    if (isNumeric(this.dataSource._val2)) {
      val2 = Number(this.dataSource._val2);
    }
    if (isNumeric(val1) && isNumeric(val2) && val1 > val2) {
      this.error = 'The \'Min\' value must be less or equal to \'Max\' value';
      return;
    }
    this.dropMenuVisible = false;
    this.dataSource.val1 = this.dataSource._val1;
    this.dataSource.val2 = this.dataSource._val2;
    this.valuesChanged.emit(this.dataSource);
  }
  /**
   * @ignore
   */
  discard(): void {
    this.dropMenuVisible = false;
  }
}
