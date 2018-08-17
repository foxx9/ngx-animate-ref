import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DemoModule} from './demo/demo.module';
import {RouterModule} from '@angular/router';
import {MasterComponent} from './demo/master/master.component';
import {DetailComponent} from './demo/detail/detail.component';
import {AnimateRefModule} from '../../projects/ngx-animate-ref/src/lib/animate-ref.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DemoModule,
    AnimateRefModule.forRoot({defaultTransition: '0.5s ease-in-out all', enableBlur: true}),
    // AnimateRefModule.forRoot({ defaultTransition : '1s all cubic-bezier(.17,.67,.83,.67)'}),
    RouterModule.forRoot([
      {
        path: 'master',
        component: MasterComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
      {
        path: '**',
        redirectTo: '/master',
        pathMatch: 'full'
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
