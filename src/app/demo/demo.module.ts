import {NgModule} from '@angular/core';
import {MasterComponent} from './master/master.component';
import {DetailComponent} from './detail/detail.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AnimateRefModule} from '../../../projects/ngx-animate-ref/src/lib/animate-ref.module';

@NgModule({

  declarations: [
    MasterComponent,
    DetailComponent
  ],
  imports: [
    RouterModule,
    AnimateRefModule,
    CommonModule
  ],
  exports : [
    MasterComponent,
    DetailComponent
  ]
})
export class DemoModule {
}
