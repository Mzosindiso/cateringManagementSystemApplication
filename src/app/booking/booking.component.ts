import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../models/booking.model';
import { BookingService } from '../service/booking.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

   // Declaring and initializing variables
   public bookings: Booking[] = [];
   private bookingId: string = "";

   public newBooking: Booking =
   {
    bookingNum: "",
    clientNum: "",
    date: "",
   } 
   public editBooking: Booking =
   {
    bookingNum: "",
    clientNum: "",
    date: "",
   }
   public deleteBooking: Booking =
   {
    bookingNum: "",
    clientNum: "",
    date: "",
   }
   editBookingForm = new FormGroup({
    bookingNum: new FormControl(),
    clientNum: new FormControl(),
    date: new FormControl(),
  })
  addBookingForm = new FormGroup({
    bookingNum: new FormControl("", Validators.required),
    clientNum: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
  })
  constructor(private bookingService: BookingService, private toastr: toastrUtility) { }

  ngOnInit(): void {
    this.getBookings();
  }
  public getBookings(): void 
  {
    this.bookingService.getBookings().subscribe({
      next: (response: Booking[]) => this.bookings = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    }
    );
}
private addBooking(booking: Booking) 
  {
    this.bookingService.addBooking(booking).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }
  public onDeleteBooking(): void 
  {
    this.bookingService.deleteBooking(this.bookingId).subscribe(
      (response: void) => {
        this.getBookings();
        this.toastr.success("delete successful", "Successful!");
        this.closeDeleteBookingModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 
  // Methods for opening and closing HTML models on CRUD operations
  openDeleteBookingPopup(booking: Booking) 
  {
    this.bookingId = booking.bookingNum!;
    document.getElementById("deleteBookingModal")!.style.display = "block";
  }

  closeDeleteBookingModel() 
  {
    document.getElementById("deleteBookingModal")!.style.display = "none";
  }

  openAddBookingPopup() 
  {
    document.getElementById("addBookingModal")!.style.display = "block";
  }

  closeAddBookingPopup() 
  {
    document.getElementById("addBookingModal")!.style.display = "none";
  }

  openUpdateBookingPopup(booking: Booking) 
  {
    this.editBookingForm.patchValue({
      bookingNum: booking.bookingNum,
      clientNum: booking.clientNum,
      date: booking.date,
    });
    document.getElementById("updateBookingModal")!.style.display = "block";
  }

  closeUpdateBookingPopup() 
  {
    document.getElementById("updateBookingModal")!.style.display = "none";
  }

// Submit Forms
submitEditBookingForm() 
{
  this.editBooking.bookingNum = this.editBookingForm.value.bookingNum;
  this.editBooking.clientNum = this.editBookingForm.value.clientNum;
  this.editBooking.date = this.editBookingForm.value.date;
  this.addBooking(this.editBooking);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
} 
submitAddBookingForm() 
{
  this.newBooking.bookingNum = this.addBookingForm.value.bookingNum!;
  this.newBooking.clientNum = this.addBookingForm.value.clientNum!;
  this.newBooking.date = this.addBookingForm.value.date!;
  this.addBooking(this.newBooking);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
 // Validation check
 verifyAddBookingForm($event: any): void
 {
   if(this.addBookingForm.value.bookingNum === "" || this.addBookingForm.value.clientNum === "" || this.addBookingForm.value.date === "")
   {
     $event.preventDefault();
     this.toastr.error("Please fill in all the fields", "Form Error!");
   }else{
     this.toastr.success("Booking added Successfully", "Form Successful");
   }
 }
 verifyEditBookingForm($event: any): void
  {
    if(this.editBookingForm.value.bookingNum === "" || this.editBookingForm.value.clientNum === "" || this.editBookingForm.value.date === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Booking Updated Successfully", "Form Successful");
    }
  }
}