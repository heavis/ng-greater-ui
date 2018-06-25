import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgguDropDownsModule} from './dropdowns/dropdowns.module';

const NGGU_MODULES = [
  NgguDropDownsModule
];

@NgModule({ imports: [
  NgguDropDownsModule.forRoot()
], exports: NGGU_MODULES})
export class NgguRootModule {
}

@NgModule({imports: NGGU_MODULES, exports: NGGU_MODULES})
export class NgguModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgguRootModule
    };
  }
}
