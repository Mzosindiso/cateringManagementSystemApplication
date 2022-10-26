import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefComponent } from './chef/chef.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PaymentComponent } from './payment/payment.component';
import { DateComponent } from './date/date.component';

// Add paths to your page here
const routes: Routes = [
  {path:"", redirectTo:"loginForm", pathMatch:"full"},
  {path:"login", component: LoginFormComponent},
  {path:"chef", component: ChefComponent},
  {path:"payment", component: PaymentComponent},
  {path:"date", component: DateComponent},

  //for new components
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// add component into array
export const routingComponents = [ LoginFormComponent, ChefComponent, PaymentComponent, DateComponent]