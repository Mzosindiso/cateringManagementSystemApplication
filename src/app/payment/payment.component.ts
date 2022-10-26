import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Payment } from '../models/payment.model';
import { PaymentService } from '../service/payment.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // Declaring and initializing variables
  public payments: Payment[] = [];
  private paymentId: string = "";

  public newPayment: Payment =
  {
    paymentNum: "",
    amount: "",
    clientNum: "",
    date: "",
    paymentType: "",
    venueId: "",
  }

  public editPayment: Payment =
    {
      paymentNum: "",
      amount: "",
      clientNum: "",
      date: "",
      paymentType: "",
      venueId: "",
    }

    public deletePayment: Payment =
    {
      paymentNum: "",
      amount: "",
      clientNum: "",
      date: "",
      paymentType: "",
      venueId: "",
    }

    editPaymentForm = new FormGroup({
      paymentNum: new FormControl(),
      amount: new FormControl(),
      clientNum: new FormControl(),
      date: new FormControl(),
      paymentType: new FormControl(),
      venueId: new FormControl(),
    })

    addPaymentForm = new FormGroup({
      paymentNum: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required),
      clientNum: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      paymentType: new FormControl("", Validators.required),
      venueId: new FormControl("", Validators.required),
    })

  constructor(private paymentService: PaymentService, private toastr: toastrUtility) { }

  ngOnInit():  void{
    this.getPayments();
  }

  public getPayments(): void 
  {
    this.paymentService.getPayments().subscribe({
      next: (response: Payment[]) => this.payments = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    }
    );
  }

  private addPayment(payment: Payment) 
  {
    this.paymentService.addPayment(payment).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }

  public onDeletePayment(): void 
  {
    this.paymentService.deletePayment(this.paymentId).subscribe(
      (response: void) => {
        this.getPayments();
        this.toastr.success("delete successful", "Successful");
        this.closeDeletePaymentModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Methods for opening and closing HTML models on CRUD operations
  openDeletePaymentPopup(payment: Payment) 
  {
    this.paymentId = payment.paymentNum!;
    document.getElementById("deletePaymentModal")!.style.display = "block";
  }

  closeDeletePaymentModel() 
  {
    document.getElementById("deletePaymentModal")!.style.display = "none";
  }

  openAddPaymentPopup() 
  {
    document.getElementById("addPaymentModal")!.style.display = "block";
  }

  closeAddPaymentPopup() 
  {
    document.getElementById("addPaymentModal")!.style.display = "none";
  }

  openUpdatePaymentPopup(payment: Payment) 
  {
    this.editPaymentForm.patchValue({
      paymentNum: payment.paymentNum,
      amount: payment.amount,
      clientNum: payment.clientNum,
      date: payment.date,
      paymentType: payment.paymentType,
      venueId: payment.venueId,
    });
    document.getElementById("updatePaymentModal")!.style.display = "block";
  }

  closeUpdatePaymentPopup() 
  {
    document.getElementById("updatePaymentModal")!.style.display = "none";
  }

  // Submit Forms
  submitEditPaymentForm() 
  {
    this.editPayment.paymentNum = this.editPaymentForm.value.paymentNum;
    this.editPayment.amount = this.editPaymentForm.value.amount;
    this.editPayment.clientNum = this.editPaymentForm.value.clientNum;
    this.editPayment.date = this.editPaymentForm.value.date;
    this.editPayment.paymentType = this.editPaymentForm.value.paymentType;
    this.editPayment.venueId = this.editPaymentForm.value.venueId;
    this.addPayment(this.editPayment);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  submitAddPaymentForm() 
  {
    this.newPayment.paymentNum= this.addPaymentForm.value.paymentNum!;
    this.newPayment.amount= this.addPaymentForm.value.amount!;
    this.newPayment.clientNum= this.addPaymentForm.value.clientNum!;
    this.newPayment.date = this.addPaymentForm.value.date!;
    this.newPayment.paymentType = this.addPaymentForm.value.paymentType!;
    this.newPayment.venueId= this.addPaymentForm.value.venueId!;
    this.addPayment(this.newPayment);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  // Validation check
  verifyAddPaymentForm($event: any): void
  {
    if(this.addPaymentForm.value.paymentNum === "" || this.addPaymentForm.value.amount === "" || this.addPaymentForm.value.clientNum === "" || this.addPaymentForm.value.date === "" || this.addPaymentForm.value.paymentType === "" || this.addPaymentForm.value.venueId === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Payment added Successfully", "Form Successful");
    }
  }

  verifyEditPaymentForm($event: any): void
  {
    if(this.editPaymentForm.value.paymentNum === "" || this.editPaymentForm.value.amount === "" || this.editPaymentForm.value.clientNum === "" || this.editPaymentForm.value.date === "" || this.editPaymentForm.value.paymentType === "" || this.editPaymentForm.value.venueId === "")
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Payment Updated Successfully", "Form Successful");
    }
  }
}


