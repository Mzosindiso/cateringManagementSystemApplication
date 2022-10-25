import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefComponent } from './chef/chef.component';
import { LoginComponent } from './login/login.component';
import { LoginformComponent } from './loginform/loginform.component';
import { WaitingStaffComponent } from './waiting-staff/waiting-staff.component';

// Add paths to your page here
const routes: Routes = [
  {path:"", redirectTo:"loginform", pathMatch:"full"},
  {path:"login", component: LoginComponent},
  {path:"chef", component: ChefComponent},
  {path:"waitingStaff", component: WaitingStaffComponent},
  //for new components
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// add component into array
export const routingComponents = [ LoginformComponent, LoginComponent, ChefComponent, WaitingStaffComponent]