import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [WelcomeRoutingModule],
  declarations: [WelcomeComponent, LoginComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
