import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client.models';
import { ClientService } from '../service/client.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  // Declaring and initializing variables
  public clients: Client[] = [];
  private clientId: string = "";

  public newClient: Client =
  {
    clientNum: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
  
  } 
  public editClient: Client =
  {
    clientNum: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
  }
  public deleteClient: Client =
  {
    clientNum: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
  }
  editClientForm = new FormGroup({
   clientNum: new FormControl(),
   firstName: new FormControl(),
   lastName: new FormControl(),
   email: new FormControl(),
   phoneNum: new FormControl(),
 })
 addClientForm = new FormGroup({
   clientNum: new FormControl("", Validators.required),
   firstName: new FormControl("", Validators.required),
   lastName: new FormControl("", Validators.required),
   email: new FormControl("", Validators.required),
   phoneNum: new FormControl("", Validators.required),
 })
 constructor(private clientService: ClientService, private toastr: toastrUtility) { }


  ngOnInit(): void {
    this.getClients();
  }
  public getClients(): void{
    this.clientService.getClients().subscribe({
      next: (response: Client[]) => this.clients = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")

  }
  );
}
  private addClient(client: Client) 
  {
    this.clientService.addClient(client).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }
  public onDeleteClient(): void 
  {
    this.clientService.deleteClient(this.clientId).subscribe(
      (response: void) => {
        this.getClients();
        this.toastr.success("delete successful", "Successful!");
        this.closeDeleteClientModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 
   // Methods for opening and closing HTML models on CRUD operations
   openDeleteClientPopup(client: Client) 
   {
     this.clientId = client.clientNum!;
     document.getElementById("deleteClientModal")!.style.display = "block";
   }
 
   closeDeleteClientModel() 
   {
     document.getElementById("deleteClientModal")!.style.display = "none";
   }
 
   openAddClientPopup() 
   {
     document.getElementById("addClientModal")!.style.display = "block";
   }
 
   closeAddClientPopup() 
   {
     document.getElementById("addClientModal")!.style.display = "none";
   }
 
   openUpdateClientPopup(client: Client) 
   {
     this.editClientForm.patchValue({
       clientNum: client.clientNum,
       firstName: client.firstName,
       lastName: client.lastName,
       email: client.email,
       phoneNum: client.phoneNum,
     });
     document.getElementById("updateClientModal")!.style.display = "block";
   }
 
   closeUpdateClientPopup() 
   {
     document.getElementById("updateClientModal")!.style.display = "none";
   }
 
 // Submit Forms
 submitEditClientForm() 
 {
   this.editClient.clientNum = this.editClientForm.value.clientNum;
   this.editClient.firstName= this.editClientForm.value.firstName;
   this.editClient.lastName = this.editClientForm.value.lastName;
   this.editClient.email = this.editClientForm.value.email;
   this.editClient.phoneNum = this.editClientForm.value.phoneNum;
   this.addClient(this.editClient);
   setTimeout(() => {
     window.location.reload();
   }, 1000);
 } 
 submitAddClientForm() 
 {
   this.newClient.clientNum = this.addClientForm.value.clientNum!;
   this.newClient.firstName = this.addClientForm.value.firstName!;
   this.newClient.lastName = this.addClientForm.value.lastName!;
   this.newClient.email = this.addClientForm.value.email!;
   this.newClient.phoneNum = this.addClientForm.value.phoneNum!;
   this.addClient(this.newClient);
   setTimeout(() => {
     window.location.reload();
   }, 1000);
 }

 // Validation check
 verifyAddClientForm($event: any): void
 {
   if(this.addClientForm.value.clientNum === "" || this.addClientForm.value.firstName === "" || this.addClientForm.value.lastName === "" || this.addClientForm.value.email === ""|| this.addClientForm.value.phoneNum === "")
   {
     $event.preventDefault();
     this.toastr.error("Please fill in all the fields", "Form Error!");
   }else{
     this.toastr.success("Client added Successfully", "Form Successful");
   }
 }
 verifyEditClientForm($event: any): void
  {
    if(this.editClientForm.value.clientNum === "" || this.editClientForm.value.firstName === "" || this.editClientForm.value.lastName === "" || this.editClientForm.value.email === "" || this.editClientForm.value.phoneNum === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Client Updated Successfully", "Form Successful");
    }
  }

}
