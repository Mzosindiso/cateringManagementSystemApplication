import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Staff } from '../models/staff.model';
import { StaffService } from '../service/staff.service';
import { toastrUtility } from '../utility/toastrUtility.utility';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

   // Declaring and initializing variables
   public staffs: Staff[] = [];
   private staffId: string = "";
 
   public newStaff: Staff =
     {
       employeeId: "",
       firstName: "",
       lastName: "",
       staffType: "",
     }
 
   public editStaff: Staff =
     {
       employeeId: "",
       firstName: "",
       lastName: "",
       staffType: "",
     }
 
   public deleteStaff: Staff =
     {
       employeeId: "",
       firstName: "",
       lastName: "",
       staffType: "",
     }
 
     editStaffForm = new FormGroup({
       employeeId: new FormControl(),
       firstName: new FormControl(),
       lastName: new FormControl(),
       staffType: new FormControl(),
     })
   
     addStaffForm = new FormGroup({
       employeeId: new FormControl("", Validators.required),
       firstName: new FormControl("", Validators.required),
       lastName: new FormControl("", Validators.required),
       staffType: new FormControl("", Validators.required),
     })
   
   constructor(private staffService: StaffService, private toastr: toastrUtility) { }
 
   ngOnInit() 
   {
     this.getStaffs();
   }
 
   public getStaffs(): void 
   {
     this.staffService.getStaffs().subscribe({
       next: (response: Staff[]) => this.staffs = response,
       error: (error) => console.log(error),
       complete: () => console.info("Request successful!")
     }
     );
   }
 
   private addStaff(staff: Staff) 
   {
     this.staffService.addStaff(staff).subscribe({
       error: (error) => console.log(error),
       complete: () => console.log("request ran"),
     });
   }
 
   public onDeleteStaff(): void 
   {
     this.staffService.deleteStaff(this.staffId).subscribe(
       (response: void) => {
         this.getStaffs();
         this.toastr.success("delete successful", "success");
         this.closeDeleteStaffModel();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
   }
 
   // Methods for opening and closing HTML models on CRUD operations
   openDeleteStaffPopup(staff: Staff) 
   {
     this.staffId = staff.employeeId!;
     document.getElementById("deleteStaffModal")!.style.display = "block";
   }
 
   closeDeleteStaffModel() 
   {
     document.getElementById("deleteStaffModal")!.style.display = "none";
   }
 
   openAddStaffPopup() 
   {
     document.getElementById("addStaffModal")!.style.display = "block";
   }
 
   closeAddStaffPopup() 
   {
     document.getElementById("addCStaffModal")!.style.display = "none";
   }
 
   openUpdateStaffPopup(staff: Staff) 
   {
     this.editStaffForm.patchValue({
       employeeId: staff.employeeId,
       firstName: staff.firstName,
       lastName: staff.lastName,
       staffType: staff.staffType,
     });
     document.getElementById("updateStaffModal")!.style.display = "block";
   }
 
   closeUpdateStaffPopup() 
   {
     document.getElementById("updateStaffModal")!.style.display = "none";
   }
 
   // Submit Forms
   submitEditStaffForm() 
   {
     this.editStaff.employeeId = this.editStaffForm.value.employeeId;
     this.editStaff.firstName = this.editStaffForm.value.firstName;
     this.editStaff.lastName = this.editStaffForm.value.lastName;
     this.editStaff.staffType = this.editStaffForm.value.staffType;
     this.addStaff(this.editStaff);
     setTimeout(() => {
       window.location.reload();
     }, 1000);
   }
 
   submitAddStaffForm() 
   {
     this.newStaff.employeeId = this.addStaffForm.value.employeeId!;
     this.newStaff.firstName = this.addStaffForm.value.firstName!;
     this.newStaff.lastName = this.addStaffForm.value.lastName!;
     this.newStaff.staffType = this.addStaffForm.value.staffType!;
     this.addStaff(this.newStaff);
     setTimeout(() => {
       window.location.reload();
     }, 1000);
   }
 
   // Validation check
   verifyAddStaffForm($event: any): void
   {
     if(this.addStaffForm.value.employeeId === "" || this.addStaffForm.value.firstName === "" || this.addStaffForm.value.lastName === "" || this.addStaffForm.value.staffType === "")
     {
       $event.preventDefault();
       this.toastr.error("Please fill in all the fields", "Form Error!");
     }else{
       this.toastr.success("Staff added Successfully", "Form Successful");
     }
   }
 
   verifyEditStaffForm($event: any): void
   {
     if(this.editStaffForm.value.employeeId === "" || this.editStaffForm.value.firstName === "" || this.editStaffForm.value.lastName === "" || this.editStaffForm.value.staffType === "")
     {
       $event.preventDefault();
       this.toastr.error("Please fill in all the fields", "Form Error!");
     }else{
       this.toastr.success("Staff Updated Successfully", "Form Successful");
     }
   }

}
