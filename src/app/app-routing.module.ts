import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ChefComponent } from './chef/chef.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';


// Add paths to your page here
const routes: Routes = [
  {path:"", redirectTo:"loginForm", pathMatch:"full"},
  {path:"login", component: LoginComponent},
  {path:"chef", component: ChefComponent},
  {path:"booking", component: BookingComponent},
  {path:"client", component: ClientComponent},
  //for new components
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// add component into array
export const routingComponents = [ LoginComponent, ChefComponent, BookingComponent,ClientComponent ]