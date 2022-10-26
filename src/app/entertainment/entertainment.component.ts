import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entertainment } from '../models/entertainment.model';
import { EntertainmentService } from '../service/entertainment.service';
import { toastrUtility } from '../utility/toastrUtility.utility';

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.css']
})
export class EntertainmentComponent implements OnInit {

  public entertainments: Entertainment[] = [];
  private entertainmentId: string = "";

  public newEntertainment: Entertainment =
    {
      entertainmentType: "",
      cost: 0,
    }

  public editEntertainment: Entertainment =
    {
      entertainmentType: "",
      cost: 0,
    }

  public deleteEntertainment: Entertainment =
    {
      entertainmentType: "",
      cost: 0,
    }

    editEntertainmentForm = new FormGroup({
      entertainmentType: new FormControl(),
      cost: new FormControl(),
    })
  
    addEntertainmentForm = new FormGroup({
      entertainmentType: new FormControl("", Validators.required),
      cost: new FormControl(0, Validators.required),
    })

  constructor(private entertainmentService: EntertainmentService, private toastr: toastrUtility) { }

  ngOnInit(): void 
  {
    this.getEntertainments()
  }

  public getEntertainments(): void 
  {
    this.entertainmentService.getEntertainments().subscribe({
      next: (response: Entertainment[]) => this.entertainments = response,
      error: (error) => console.log(error),
      complete: () => console.info("Request successful!")
    }
    );
  }

  private addEntertainment(entertainment: Entertainment) 
  {
    this.entertainmentService.addEntertainment(entertainment).subscribe({
      error: (error) => console.log(error),
      complete: () => console.log("request ran"),
    });
  }

  public onDeleteEntertainment(): void 
  {
    this.entertainmentService.deleteEntertainment(this.entertainmentId).subscribe(
      (response: void) => {
        this.getEntertainments();
        this.toastr.success("delete successful", "successful");
        this.closeDeleteEntertainmentModel();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openDeleteEntertainmentPopup(entertainment: Entertainment) 
  {
    this.entertainmentId = entertainment.entertainmentType!;
    document.getElementById("deleteEntertainmentModal")!.style.display = "block";
  }

  closeDeleteEntertainmentModel() 
  {
    document.getElementById("deleteEntertainmentModal")!.style.display = "none";
  }

  openAddEntertainmentPopup() 
  {
    document.getElementById("addEntertainmentModal")!.style.display = "block";
  }

  closeAddEntertainmentPopup() 
  {
    document.getElementById("addEntertainmentModal")!.style.display = "none";
  }

  openUpdateEntertainmentPopup(entertainment: Entertainment) 
  {
    this.editEntertainmentForm.patchValue({
      entertainmentType: entertainment.entertainmentType,
      cost: entertainment.cost,
    });
    document.getElementById("updateEntertainmentModal")!.style.display = "block";
  }

  closeUpdateEntertainmentPopup() 
  {
    document.getElementById("updateEntertainmentModal")!.style.display = "none";
  }

  submitEditEntertainmentForm() 
  {
    this.editEntertainment.entertainmentType = this.editEntertainmentForm.value.entertainmentType;
    this.editEntertainment.cost = this.editEntertainmentForm.value.cost;

    this.addEntertainment(this.editEntertainment);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  submitAddEntertainmentForm() 
  {
    this.newEntertainment.entertainmentType = this.addEntertainmentForm.value.entertainmentType!;
    this.newEntertainment.cost = this.addEntertainmentForm.value.cost!;

    this.addEntertainment(this.newEntertainment);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  verifyAddEntertainmentForm($event: any): void
  {
    if(this.addEntertainmentForm.value.entertainmentType === "" || this.addEntertainmentForm.value.cost === 0)
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Entertainment added Successfully", "Form Successful");
    }
  }

  verifyEditEntertainmentForm($event: any): void
  {
    if(this.editEntertainmentForm.value.entertainmentType === "" || this.editEntertainmentForm.value.cost === 0)
    {
      $event.preventDefault();
      this.toastr.error("Please fill in all the fields", "Form Error!");
    }else{
      this.toastr.success("Entertainment Updated Successfully", "Form Successful");
    }
  }


}
