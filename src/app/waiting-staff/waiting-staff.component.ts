import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WaitingStaff } from '../models/waitingStaff.model';
import { WaitingStaffService } from '../service/waitingStaff.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-waiting-staff',
  templateUrl: './waiting-staff.component.html',
  styleUrls: ['./waiting-staff.component.css']
})
export class WaitingStaffComponent implements OnInit 
{
  public waitingStaffs: WaitingStaff[] = [];
  private waitingStaffId: string = "";

  public newWaitingStaff: WaitingStaff =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

  public editWaitingStaff: WaitingStaff =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

  public deleteWaitingStaff: WaitingStaff =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

    editWaitingStaffForm = new FormGroup({
      employeeId: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
    })
  
    addWaitingStaffForm = new FormGroup({
      employeeId: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
    })
    
  constructor(private waitingStaffService: WaitingStaffService, private toastr: toastrUtility) { }

  ngOnInit(): void 
  {
    this.getWaitingStaffs();
  }

  public getWaitingStaffs(): void 
  {
    this.waitingStaffService.getWaitingStaffs().subscribe({
      next: (response: WaitingStaff[]) => this.waitingStaffs = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    }
    );
  }

  private addWaitingStaff(waitingStaff: WaitingStaff) 
  {
    this.waitingStaffService.addWaitingStaff(waitingStaff).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }

  public onDeleteWaitingStaff(): void 
  {
    this.waitingStaffService.deleteWaitingStaff(this.waitingStaffId).subscribe(
      (response: void) => {
        this.getWaitingStaffs();
        this.toastr.success("delete successful", " ");
        this.closeDeleteWaitingStaffModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDeleteWaitingStaffPopup(waitingStaff: WaitingStaff) 
  {
    this.waitingStaffId = waitingStaff.employeeId!;
    document.getElementById("deleteWaitingStaffModal")!.style.display = "block";
  }

  closeDeleteWaitingStaffModel() 
  {
    document.getElementById("deleteWaitingStaffModal")!.style.display = "none";
  }

  openAddWaitingStaffPopup() 
  {
    document.getElementById("addWaitingStaffModal")!.style.display = "block";
  }

  closeAddWaitingStaffPopup() 
  {
    document.getElementById("addWaitingStaffModal")!.style.display = "none";
  }

  openUpdateWaitingStaffPopup(waitingStaff: WaitingStaff) 
  {
    this.editWaitingStaffForm.patchValue({
      employeeId: waitingStaff.employeeId,
      firstName: waitingStaff.firstName,
      lastName: waitingStaff.lastName,
    });
    document.getElementById("updateWaitingStaffModal")!.style.display = "block";
  }

  closeUpdateWaitingStaffPopup() 
  {
    document.getElementById("updateWaitingStaffModal")!.style.display = "none";
  }

  submitEditWaitingStaffForm() 
  {
    this.editWaitingStaff.employeeId = this.editWaitingStaffForm.value.employeeId;
    this.editWaitingStaff.firstName = this.editWaitingStaffForm.value.firstName;
    this.editWaitingStaff.lastName = this.editWaitingStaffForm.value.lastName;
    this.addWaitingStaff(this.editWaitingStaff);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  submitAddWaitingStaffForm() 
  {
    this.newWaitingStaff.employeeId = this.addWaitingStaffForm.value.employeeId!;
    this.newWaitingStaff.firstName = this.addWaitingStaffForm.value.firstName!;
    this.newWaitingStaff.lastName = this.addWaitingStaffForm.value.lastName!;
    this.addWaitingStaff(this.newWaitingStaff);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  verifyAddWaitingStaffForm($event: any): void
  {
    if(this.addWaitingStaffForm.value.employeeId === "" || this.addWaitingStaffForm.value.firstName === "" || this.addWaitingStaffForm.value.lastName === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("WaitingStaff added Successfully", "Form Successful");
    }
  }

  verifyEditWaitingStaffForm($event: any): void
  {
    if(this.editWaitingStaffForm.value.employeeId === "" || this.editWaitingStaffForm.value.firstName === "" || this.editWaitingStaffForm.value.lastName === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("WaitingStaff Updated Successfully", "Form Successful");
    }
  }
}
