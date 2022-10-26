import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';
import { ChefComponent } from './chef/chef.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import { WaitingStaffComponent } from './waiting-staff/waiting-staff.component';

import { PaymentComponent } from './payment/payment.component';
import { DateComponent } from './date/date.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';

// Add paths to your page here
const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component: LoginComponent},
  {path:"chef", component: ChefComponent},
  {path:"waitingStaff", component: WaitingStaffComponent},
  {path:"admin", component: AdminComponent},
  {path:"booking", component: BookingComponent},
  {path:"client", component: ClientComponent},
  {path:"payment", component: PaymentComponent},
  {path:"date", component: DateComponent},
  {path:"entertainment", component: EntertainmentComponent},

  //for new components
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// add component into array

export const routingComponents = [ LoginComponent, ChefComponent, BookingComponent,ClientComponent , PaymentComponent, DateComponent, PaymentComponent, DateComponent]