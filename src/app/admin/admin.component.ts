import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../models/admin.model';
import { AdminService } from '../service/admin.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit 
{
  
  public admins: Admin[] = [];
  private adminNum: string = "";

  public newAdmin: Admin =
    {
      adminNum: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
    }

    public editAdmin: Admin =
    {
      adminNum: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
    }

    public deleteAdmin: Admin =
    {
      adminNum: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
    }

    editAdminForm = new FormGroup({
      adminNum: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phoneNum: new FormControl(),
    })

    addAdminForm = new FormGroup({
      adminNum: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phoneNum: new FormControl("", Validators.required),
    })

    constructor(private adminService: AdminService, private toastr: toastrUtility) { }

  ngOnInit() 
  {
    this.getAdmins();
  }

  public getAdmins(): void
  {
    this.adminService.getAdmins().subscribe({
      next: (response: Admin[]) => this.admins = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    }
    );
  }

  private addAdmin(admin: Admin) 
  {
    this.adminService.addAdmin(admin).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }

  public onDeleteAdmin(): void 
  {
    this.adminService.deleteAdmin(this.adminNum).subscribe(
      (response: void) => {
        this.getAdmins();
        this.toastr.success("Delete Successful", "Thank you");
        this.closeDeleteAdminModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDeleteAdminPopup(admin: Admin) 
  {
    this.adminNum = admin.adminNum!;
    document.getElementById("deleteAdminModal")!.style.display = "block";
  }

  closeDeleteAdminModel() 
  {
    document.getElementById("deleteAdminModal")!.style.display = "none";
  }

  openAddAdminPopup() 
  {
    document.getElementById("addAdminModal")!.style.display = "block";
  }

  closeAddAdminPopup() 
  {
    document.getElementById("addAdminModal")!.style.display = "none";
  }

  openUpdateAdminPopup(admin: Admin) 
  {
    this.editAdminForm.patchValue({
      adminNum: admin.adminNum,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phoneNum: admin.phoneNum,
    });
    document.getElementById("updateAdminModal")!.style.display = "block";
  }

  closeUpdateAdminPopup() 
  {
    document.getElementById("updateAdminModal")!.style.display = "none";
  }

  submitEditAdminForm() 
  {
    this.editAdmin.adminNum = this.editAdminForm.value.adminNum;
    this.editAdmin.firstName = this.editAdminForm.value.firstName;
    this.editAdmin.lastName = this.editAdminForm.value.lastName;
    this.editAdmin.email = this.editAdminForm.value.email;
    this.editAdmin.phoneNum = this.editAdminForm.value.phoneNum;
    this.addAdmin(this.editAdmin);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  submitAddAdminForm() 
  {
    this.newAdmin.adminNum = this.addAdminForm.value.adminNum!;
    this.newAdmin.firstName = this.addAdminForm.value.firstName!;
    this.newAdmin.lastName = this.addAdminForm.value.lastName!;
    this.newAdmin.email = this.addAdminForm.value.email!;
    this.newAdmin.phoneNum = this.addAdminForm.value.phoneNum!;
    this.addAdmin(this.newAdmin);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  verifyAddAdminForm($event: any): void
  {
    if(this.addAdminForm.value.adminNum === "" || this.addAdminForm.value.firstName === "" || this.addAdminForm.value.lastName === "" || this.addAdminForm.value.email === "" || this.addAdminForm.value.phoneNum === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Admin added Successfully", "Form Successful");
    }
  }

  verifyEditAdminForm($event: any): void
  {
    if(this.editAdminForm.value.adminNum === "" || this.editAdminForm.value.firstName === "" || this.editAdminForm.value.lastName === "" || this.editAdminForm.value.email === "" || this.editAdminForm.value.phoneNum === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Admin Updated Successfully", "Form Successful");
    }
  }
}
