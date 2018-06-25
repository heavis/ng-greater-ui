import {Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnInit, Output} from '@angular/core';
import {isNumeric} from '../util/util';
import {NgguDropdown} from './dropdowns';

export interface RangeContext {
  name: string;
  min?: number;
  max?: number;
  val1?: any;
  val2?: any;
}

export class InternalRangeContext implements RangeContext {
  name: string;
  min?: number;
  max?: number;
  val1?: any;
  val2?: any;
  _val1?: any;
  _val2?: any;
}

/**
 * nggu-dropdown-range
 */
@Component({
  selector: 'ngguNumRangeItems',
  exportAs: 'ngguNumRangeItems',
  template: `
    <div class="label-for-text">
      <span>Min</span><span>{{_dataSource.min !== undefined ? '(>=' + _dataSource.min + ')' : ''
      }}</span><span>:</span>
    </div>
    <div class="text-group">
      <input type="text" [(ngModel)]="_dataSource._val1" (blur)="onRangeBlur()"
             (keyup)="onRangeKeyup($event)">
    </div>
    <div class="label-for-text">
      <span>Max</span><span>{{_dataSource.max ? '(<=' + _dataSource.max + ')' : '' }}</span><span>:</span>
    </div>
    <div class="text-group">
      <input type="text" [(ngModel)]="_dataSource._val2" (blur)="onRangeBlur()"
             (keyup)="onRangeKeyup($event)">
    </div>
    <div class="error-group">
      <span>{{error}}</span>
    </div>
    <div class="btn-group">
      <div class="btn btn-primary" (click)="confirm()">Update</div>
      <div class="btn btn-secondary" (click)="dropdown.discard()">Close</div>
    </div>
  `
})
export class NumRangeItems implements OnInit {
  private _dataSource: InternalRangeContext;
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
  dataSource: RangeContext;

  /**
   * @ignore
   */
  constructor(@Inject(forwardRef(() => NgguDropdown))  public dropdown, private _elementRef: ElementRef) {
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.dataSource = this.dataSource || new InternalRangeContext();
    this._dataSource = <InternalRangeContext>this.dataSource;
    this._dataSource._val1 = this._dataSource.val1;
    this._dataSource._val2 = this._dataSource.val2;
  }

  /**
   * @ignore
   */
  onRangeBlur(): boolean {
    if (this._dataSource._val1) {
      if (!isNaN(this._dataSource._val1)) {
        if (!isNaN(this._dataSource.min) && parseFloat(this._dataSource._val1) < this._dataSource.min) {
          this.error = 'The \'Min\' value must be greater or equal to ' + this._dataSource.min;
          return false;
        }
      } else {
        this.error = 'The \'Min\' value must be number';
        return false;
      }
    }

    if (this._dataSource._val2) {
      if (!isNaN(this._dataSource._val2)) {
        if (!isNaN(this._dataSource.max) && parseFloat(this._dataSource._val2) > this._dataSource.max) {
          this.error = 'The \'Max\' value must be less or equal to ' + this._dataSource.max;
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
    if (isNumeric(this._dataSource._val1)) {
      val1 = Number(this._dataSource._val1);
    }
    if (isNumeric(this._dataSource._val2)) {
      val2 = Number(this._dataSource._val2);
    }
    if (isNumeric(val1) && isNumeric(val2) && val1 > val2) {
      this.error = 'The \'Min\' value must be less or equal to \'Max\' value';
      return;
    }
    this._dataSource.val1 = this._dataSource._val1;
    this._dataSource.val2 = this._dataSource._val2;
    this.dropdown.discard();
  }
  /**
   * @ignore
   */
  discard(): void {
    this.dropdown.discard();
  }
}

