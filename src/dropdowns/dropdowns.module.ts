import {ModuleWithProviders, NgModule} from '@angular/core';
import {DropDownsConfig} from './dropdowns.config';
import {NumRange} from './num-range';
import {FormsModule} from "@angular/forms";

const NGGU_DROPDOWNS = [NumRange];

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
