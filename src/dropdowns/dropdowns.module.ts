import {ModuleWithProviders, NgModule} from '@angular/core';
import {DropDownsConfig} from './dropdowns.config';
import {FormsModule} from '@angular/forms';
import {NgguDropdown, NgguDropdownAnchor, NgguDropdownMenu, NgguDropdownToggle} from './dropdowns';
import {NumRangeItems} from './dropdown-items';

const NGGU_DROPDOWNS = [NgguDropdown, NgguDropdownAnchor, NgguDropdownToggle, NgguDropdownMenu, NumRangeItems];

@NgModule({
  imports: [FormsModule],
  declarations: NGGU_DROPDOWNS,
  exports: NGGU_DROPDOWNS
})
export class NgguDropDownsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgguDropDownsModule,
      providers: [DropDownsConfig]
    };
  }
}
