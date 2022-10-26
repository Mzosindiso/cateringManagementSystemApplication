import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Login } from '../models/login.model';
import { LoginService } from '../service/login.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public logins: Login[] = [];
  private loginId: string = "";

  public newLogin: Login =
    {
      loginId: "",
      adminNum: "",
      adminPassword: "",
    }

  public editLogin: Login =
    {
      loginId: "",
      adminNum: "",
      adminPassword: "",
    }

  public deleteLogin: Login =
    {
      loginId: "",
      adminNum: "",
      adminPassword: "",
    }

    editLoginForm = new FormGroup({
      loginId: new FormControl(),
      adminNum: new FormControl(),
      adminPassword: new FormControl(),
    })
  
    addLoginForm = new FormGroup({
      loginId: new FormControl("", Validators.required),
      adminNum: new FormControl("", Validators.required),
      adminPassword: new FormControl("", Validators.required),
    })

    constructor(private loginService: LoginService, private toastr: toastrUtility) { }

  ngOnInit() 
  {
    this.getLogins();
  }

  public getLogins(): void 
  {
    this.loginService.getLogins().subscribe({
      next: (response: Login[]) => this.logins = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    });
  }

  private addLogin(login: Login) 
  {
    this.loginService.addLogin(login).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }

  public onDeleteLogin(): void 
  {
    this.loginService.deleteLogin(this.loginId).subscribe(
      (response: void) => {
        this.getLogins();
        this.toastr.success("Delete Successful", "Thank you");
        this.closeDeleteLoginModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDeleteLoginPopup(login: Login) 
  {
    this.loginId = login.loginId!;
    document.getElementById("deleteLoginModal")!.style.display = "block";
  }

  closeDeleteLoginModel() 
  {
    document.getElementById("deleteLoginModal")!.style.display = "none";
  }

  openAddLoginPopup() 
  {
    document.getElementById("addLoginModal")!.style.display = "block";
  }

  closeAddLoginPopup() 
  {
    document.getElementById("addLoginModal")!.style.display = "none";
  }

  openUpdateLoginPopup(login: Login) 
  {
    this.editLoginForm.patchValue({
      loginId: login.loginId,
      adminNum: login.adminNum,
      adminPassword: login.adminPassword,
    });
    document.getElementById("updateLoginModal")!.style.display = "block";
  }

  closeUpdateLoginPopup() 
  {
    document.getElementById("updateLoginModal")!.style.display = "none";
  }

  submitEditLoginForm() 
  {
    this.editLogin.loginId = this.editLoginForm.value.loginId;
    this.editLogin.adminNum = this.editLoginForm.value.adminNum;
    this.editLogin.adminPassword = this.editLoginForm.value.adminPassword;
    this.addLogin(this.editLogin);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  submitAddLoginForm() 
  {
    this.newLogin.loginId = this.addLoginForm.value.loginId!;
    this.newLogin.adminNum = this.addLoginForm.value.adminNum!;
    this.newLogin.adminPassword = this.addLoginForm.value.adminPassword!;
    this.addLogin(this.newLogin);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  verifyAddLoginForm($event: any): void
  {
    if(this.addLoginForm.value.loginId === "" || this.addLoginForm.value.adminNum === "" || this.addLoginForm.value.adminPassword === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Login Credentials added Successfully", "Form Successful");
    }
  }

  verifyEditLoginForm($event: any): void
  {
    if(this.editLoginForm.value.loginId === "" || this.editLoginForm.value.adminNum === "" || this.editLoginForm.value.adminPassword === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Login Credentials updated Successfully", "Form Successful");
    }
  }
}