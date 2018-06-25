import {ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Inject, OnInit, Output} from '@angular/core';

@Directive({
  selector:  '[ngguDropdownAnchor]',
  exportAs: 'ngguDropdownAnchor'
})
export class NgguDropdownAnchor {
  anchorEl: any;

  constructor(@Inject(forwardRef(() => NgguDropdown)) public dropdown, private _elementRef: ElementRef) {
    this.anchorEl = _elementRef.nativeElement;
  }

  isEventFrom($event): void {
    return this._elementRef.nativeElement.contains($event.target);
  }
}

@Directive({
  selector:  '[ngguDropdownToggle]',
  exportAs: 'ngguDropdownToggle',
  host: {
    'class': 'drop-down-toggle',
    '[attr.aria-expanded]': 'dropdown.isOpen()',
    '(click)': 'toggleOpen()'
  },
  providers: [{provide: NgguDropdownAnchor, useExisting: forwardRef(() => NgguDropdownToggle)}]
})
export class NgguDropdownToggle extends NgguDropdownAnchor {
  constructor(@Inject(forwardRef(() => NgguDropdown)) dropdown, elementRef: ElementRef) {
    super(dropdown, elementRef);
  }

  toggleOpen(): void {
    this.dropdown.toggle();
  }
}

@Directive({
  selector:  '[ngguDropdownMenu]',
  exportAs: 'ngguDropdownMenu',
  host: {
    '[class.drop-down-menu]': 'true',
    '[class.none]': '!dropdown.isOpen()'
  }
})
export class NgguDropdownMenu {
  constructor(@Inject(forwardRef(() => NgguDropdown)) public dropdown, private _elementRef: ElementRef) {
  }

  isEventFrom($event): boolean {
    return this._elementRef.nativeElement.contains($event.target);
  }
}

@Directive({
  selector:  '[ngguDropdown]',
  exportAs: 'ngguDropdown',
  host: {
    '[class.drop-down]': 'true',
    '[class.show]': 'isOpen()',
    '(keyup.esc)': 'closeFromOutsideEsc()',
    '(document:click)': 'closeFromClick($event)'
  }
})
export class NgguDropdown {
  /**
   * @ignore
   */
  dropMenuVisible: boolean;

  @ContentChild(NgguDropdownAnchor) private _anchor: NgguDropdownAnchor;
  @ContentChild(NgguDropdownMenu) private _menu: NgguDropdownMenu;

  @Output() openChange = new EventEmitter<Boolean>();

  closeFromClick($event): void {
    if ($event.button !== 2 &&
      !this._isEventFromToggle($event) &&
      !this._isEventFromMenu($event)) {
        this.discard();
    }
  }

  closeFromOutsideEsc($event): void {
    this.discard();
  }

  discard(): void {
    if (this.dropMenuVisible) {
      this.dropMenuVisible = false;
      this.openChange.emit(false);
    }
  }

  isOpen(): boolean {
    return this.dropMenuVisible;
  }

  open(): void {
    if (!this.dropMenuVisible) {
      this.dropMenuVisible = true;
      this.openChange.emit(true);
    }
  }

  toggle(): void {
    if (this.isOpen()) {
      this.discard();
    } else {
      this.open();
    }
  }

  private _isEventFromToggle($event) {
    return this._anchor.isEventFrom($event);
  }

  private _isEventFromMenu($event) {
    return this._menu ? this._menu.isEventFrom($event) : false;
  }
}
