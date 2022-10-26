import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';

// add service here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChefComponent } from './chef/chef.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChefService } from './service/chef.service';
import { WaitingStaffComponent } from './waiting-staff/waiting-staff.component';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';
import { ClientComponent } from './client/client.component';
import { DateComponent } from './date/date.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ManagerComponent } from './manager/manager.component';
import { PaymentComponent } from './payment/payment.component';
import { StaffComponent } from './staff/staff.component';
import { VenueComponent } from './venue/venue.component';
import { WaitingStaffService } from './service/waitingStaff.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    ChefComponent,
    WaitingStaffComponent,
    AdminComponent,
    BookingComponent,
    ClientComponent,
    DateComponent,
    EntertainmentComponent,
    InventoryComponent,
    ManagerComponent,
    PaymentComponent,
    StaffComponent,
    VenueComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true,
      timeOut: 3000
    }) 
  ],
  //add service in providers
  providers: [ChefService, WaitingStaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
