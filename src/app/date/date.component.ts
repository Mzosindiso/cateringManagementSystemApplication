import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Date } from '../models/date.model';
import { DateService } from '../service/date.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  // Declaring and initializing variables
  public dates: Date[] = [];
  private dateId: string = "";

  public newDate: Date =
    {
      dateNum: "",
      bookingNum: "",
      venueAvailability: "",
      venueId: "",
    }

    public editDate: Date =
    {
      dateNum: "",
      bookingNum: "",
      venueAvailability: "",
      venueId: "",
    }

    public deleteDate: Date =
    {
      dateNum: "",
      bookingNum: "",
      venueAvailability: "",
      venueId: "",
    }

    editDateForm = new FormGroup({
      dateNum: new FormControl(),
      bookingNum: new FormControl(),
      venueAvailability: new FormControl(),
      venueId: new FormControl(),
    })

    addDateForm = new FormGroup({
      dateNum: new FormControl("", Validators.required),
      bookingNum: new FormControl("", Validators.required),
      venueAvailability: new FormControl("", Validators.required),
      venueId: new FormControl("", Validators.required),
    })

  constructor(private dateService: DateService, private toastr: toastrUtility) { }

  ngOnInit(): void {
    this.getDates();
  }

  public getDates(): void 
  {
    this.dateService.getDates().subscribe({
      next: (response: Date[]) => this.dates = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    }
    );
  }

  private addDate(date: Date) 
  {
    this.dateService.addDate(date).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }

  public onDeleteDate(): void 
  {
    this.dateService.deleteDate(this.dateId).subscribe(
      (response: void) => {
        this.getDates();
        this.toastr.success("delete successful", "Successful");
        this.closeDeleteDateModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Methods for opening and closing HTML models on CRUD operations
  openDeleteDatePopup(date: Date) 
  {
    this.dateId = date.dateNum!;
    document.getElementById("deleteDateModal")!.style.display = "block";
  }

  closeDeleteDateModel() 
  {
    document.getElementById("deleteDateModal")!.style.display = "none";
  }

  openAddDatePopup() 
  {
    document.getElementById("addDateModal")!.style.display = "block";
  }

  closeAddDatePopup() 
  {
    document.getElementById("addDateModal")!.style.display = "none";
  }

  openUpdateDatePopup(date: Date) 
  {
    this.editDateForm.patchValue({
      dateNum: date.dateNum,
      bookingNum: date.bookingNum,
      venueAvailability: date.venueAvailability,
      venueId: date.venueId,
    });
    document.getElementById("updateDateModal")!.style.display = "block";
  }

  closeUpdateDatePopup() 
  {
    document.getElementById("updateDateModal")!.style.display = "none";
  }

  // Submit Forms
  submitEditDateForm() 
  {
    this.editDate.dateNum = this.editDateForm.value.dateNum;
    this.editDate.bookingNum = this.editDateForm.value.bookingNum;
    this.editDate.venueAvailability = this.editDateForm.value.venueAvailability;
    this.editDate.venueId = this.editDateForm.value.venueId;
    this.addDate(this.editDate);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  submitAddDateForm() 
  {
    this.newDate.dateNum = this.addDateForm.value.dateNum!;
    this.newDate.bookingNum = this.addDateForm.value.bookingNum!;
    this.newDate.venueAvailability = this.addDateForm.value.venueAvailability!;
    this.newDate.venueId = this.addDateForm.value.venueId!;
    this.addDate(this.newDate);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  // Validation check
  verifyAddDateForm($event: any): void
  {
    if(this.addDateForm.value.dateNum === "" || this.addDateForm.value.bookingNum === "" || this.addDateForm.value.venueAvailability === "" || this.addDateForm.value.venueId === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Date added Successfully", "Form Successful");
    }
  }

  verifyEditDateForm($event: any): void
  {
    if(this.editDateForm.value.dateNum === "" || this.editDateForm.value.bookingNum === "" || this.editDateForm.value.venueAvailability === "" || this.editDateForm.value.venueId === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Date Updated Successfully", "Form Successful");
    }
  }

}
