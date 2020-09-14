import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/home/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' }, // 默认路径(首页)
  { path: 'welcome', loadChildren: () => import('./pages/home/welcome.module').then(m => m.WelcomeModule) }, // 首页
  { path: 'login', component: LoginComponent}, // 登录页面

  { path: 'order', loadChildren: () => import('./pages/order/order-routing.module').then(m => m.OrderRoutingModule) }, // 引入order模块

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
