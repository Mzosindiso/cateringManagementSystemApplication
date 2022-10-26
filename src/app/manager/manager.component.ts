import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Manager } from '../models/manager.model';
import { ManagerService } from '../service/manager.service';
import { toastrUtility } from '../utility/toastrUtility.utility';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  // Declaring and initializing variables
  public managers: Manager[] = [];
  private managerId: string = "";

  public newManager: Manager =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

  public editManager: Manager =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

  public deleteManager: Manager =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

    editManagerForm = new FormGroup({
      employeeId: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
    })
  
    addManagerForm = new FormGroup({
      employeeId: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
    })
  
  constructor(private managerService: ManagerService, private toastr: toastrUtility) { }

  ngOnInit() 
  {
    this.getManagers();
  }

  public getManagers(): void 
  {
    this.managerService.getManagers().subscribe({
      next: (response: Manager[]) => this.managers = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    }
    );
  }

  private addManager(manager: Manager) 
  {
    this.managerService.addManager(manager).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }

  public onDeleteManager(): void 
  {
    this.managerService.deleteManager(this.managerId).subscribe(
      (response: void) => {
        this.getManagers();
        this.toastr.success("delete successful", "Success");
        this.closeDeleteManagerModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Methods for opening and closing HTML models on CRUD operations
  openDeleteManagerPopup(manager: Manager) 
  {
    this.managerId = manager.employeeId!;
    document.getElementById("deleteManagerModal")!.style.display = "block";
  }

  closeDeleteManagerModel() 
  {
    document.getElementById("deleteManagerModal")!.style.display = "none";
  }

  openAddManagerPopup() 
  {
    document.getElementById("addManagerModal")!.style.display = "block";
  }

  closeAddManagerPopup() 
  {
    document.getElementById("addManagerModal")!.style.display = "none";
  }

  openUpdateManagerPopup(manager: Manager) 
  {
    this.editManagerForm.patchValue({
      employeeId: manager.employeeId,
      firstName: manager.firstName,
      lastName: manager.lastName,
    });
    document.getElementById("updateManagerModal")!.style.display = "block";
  }

  closeUpdateManagerPopup() 
  {
    document.getElementById("updateManagerModal")!.style.display = "none";
  }

  // Submit Forms
  submitEditManagerForm() 
  {
    this.editManager.employeeId = this.editManagerForm.value.employeeId;
    this.editManager.firstName = this.editManagerForm.value.firstName;
    this.editManager.lastName = this.editManagerForm.value.lastName;
    this.addManager(this.editManager);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  submitAddManagerForm() 
  {
    this.newManager.employeeId = this.addManagerForm.value.employeeId!;
    this.newManager.firstName = this.addManagerForm.value.firstName!;
    this.newManager.lastName = this.addManagerForm.value.lastName!;
    this.addManager(this.newManager);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  // Validation check
  verifyAddManagerForm($event: any): void
  {
    if(this.addManagerForm.value.employeeId === "" || this.addManagerForm.value.firstName === "" || this.addManagerForm.value.lastName === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Manager added Successfully", "Form Successful");
    }
  }

  verifyEditManagerForm($event: any): void
  {
    if(this.editManagerForm.value.employeeId === "" || this.editManagerForm.value.firstName === "" || this.editManagerForm.value.lastName === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Manager Updated Successfully", "Form Successful");
    }
  }
}
