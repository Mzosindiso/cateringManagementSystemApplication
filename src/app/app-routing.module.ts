import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChefComponent } from './chef/chef.component';
import { LoginComponent } from './login/login.component';
import { WaitingStaffComponent } from './waiting-staff/waiting-staff.component';

// Add paths to your page here
const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component: LoginComponent},
  {path:"chef", component: ChefComponent},
  {path:"waitingStaff", component: WaitingStaffComponent},
  {path:"admin", component: AdminComponent},
  //for new components
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// add component into array
export const routingComponents = [LoginComponent, ChefComponent, WaitingStaffComponent, AdminComponent]