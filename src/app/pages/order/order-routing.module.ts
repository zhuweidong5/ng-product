// order模块
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 引入页面
import { MyinfoComponent } from './my-info/my-info.component';
import { MyorderComponent } from './my-order/my-order.component';

const routes: Routes = [
  { path: 'my-info', component: MyinfoComponent },
  { path: 'my-order', component: MyorderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
