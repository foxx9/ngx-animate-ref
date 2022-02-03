import { ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimateRefService} from './animate-ref.service';
import {AnimateRefDirective} from './animate-ref.directive';
import {ANIMATE_REF_CONFIG, AnimateRefConfig} from './animate-ref.config';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AnimateRefDirective
  ],
  exports: [
    AnimateRefDirective
  ]
})
export class AnimateRefModule {

  static forRoot(config: AnimateRefConfig): ModuleWithProviders<AnimateRefModule> {
    return {
      ngModule: AnimateRefModule,
      providers: [AnimateRefService, {provide: ANIMATE_REF_CONFIG, useValue: config}]
    };
  }
}
