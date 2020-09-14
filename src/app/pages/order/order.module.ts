import { NgModule } from '@angular/core';


import { MyinfoComponent } from './my-info/my-info.component';
import { MyorderComponent } from './my-order/my-order.component';


@NgModule({
  imports: [],
  declarations: [MyinfoComponent, MyorderComponent],
  exports: []
})
export class OrderModule { }
