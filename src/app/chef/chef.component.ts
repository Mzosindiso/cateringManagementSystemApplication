import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Chef } from '../models/chef.model';
import { ChefService } from '../service/chef.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit 
{
  // Declaring and initializing variables
  public chefs: Chef[] = [];
  private chefId: string = "";

  public newChef: Chef =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

  public editChef: Chef =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

  public deleteChef: Chef =
    {
      employeeId: "",
      firstName: "",
      lastName: "",
    }

    editChefForm = new FormGroup({
      employeeId: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
    })
  
    addChefForm = new FormGroup({
      employeeId: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
    })
  
  constructor(private chefService: ChefService, private toastr: toastrUtility) { }

  ngOnInit() 
  {
    this.getChefs();
  }

  public getChefs(): void 
  {
    this.chefService.getChefs().subscribe({
      next: (response: Chef[]) => this.chefs = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    }
    );
  }

  private addChef(chef: Chef) 
  {
    this.chefService.addChef(chef).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }

  public onDeleteChef(): void 
  {
    this.chefService.deleteChef(this.chefId).subscribe(
      (response: void) => {
        this.getChefs();
        this.toastr.success("delete successful", "successful");
        this.closeDeleteChefModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Methods for opening and closing HTML models on CRUD operations
  openDeleteChefPopup(chef: Chef) 
  {
    this.chefId = chef.employeeId!;
    document.getElementById("deleteChefModal")!.style.display = "block";
  }

  closeDeleteChefModel() 
  {
    document.getElementById("deleteChefModal")!.style.display = "none";
  }

  openAddChefPopup() 
  {
    document.getElementById("addChefModal")!.style.display = "block";
  }

  closeAddChefPopup() 
  {
    document.getElementById("addChefModal")!.style.display = "none";
  }

  openUpdateChefPopup(chef: Chef) 
  {
    this.editChefForm.patchValue({
      employeeId: chef.employeeId,
      firstName: chef.firstName,
      lastName: chef.lastName,
    });
    document.getElementById("updateChefModal")!.style.display = "block";
  }

  closeUpdateChefPopup() 
  {
    document.getElementById("updateChefModal")!.style.display = "none";
  }

  // Submit Forms
  submitEditChefForm() 
  {
    this.editChef.employeeId = this.editChefForm.value.employeeId;
    this.editChef.firstName = this.editChefForm.value.firstName;
    this.editChef.lastName = this.editChefForm.value.lastName;
    this.addChef(this.editChef);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  submitAddChefForm() 
  {
    this.newChef.employeeId = this.addChefForm.value.employeeId!;
    this.newChef.firstName = this.addChefForm.value.firstName!;
    this.newChef.lastName = this.addChefForm.value.lastName!;
    this.addChef(this.newChef);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  // Validation check
  verifyAddChefForm($event: any): void
  {
    if(this.addChefForm.value.employeeId === "" || this.addChefForm.value.firstName === "" || this.addChefForm.value.lastName === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Chef added Successfully", "Form Successful");
    }
  }

  verifyEditChefForm($event: any): void
  {
    if(this.editChefForm.value.employeeId === "" || this.editChefForm.value.firstName === "" || this.editChefForm.value.lastName === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Chef Updated Successfully", "Form Successful");
    }
  }
}