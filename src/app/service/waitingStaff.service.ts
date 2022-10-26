import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { WaitingStaff } from "../models/waitingStaff.model";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('waitingStaff-admin:12345')
      
    })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class WaitingStaffService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getWaitingStaffs(): Observable<WaitingStaff[]>{
      return this.http.get<WaitingStaff[]>(`${this.apiServerUrl}waitingStaff/all`, httpOptions);
    }
  
    public addWaitingStaff(waitingStaff: WaitingStaff): Observable<WaitingStaff>{
      return this.http.post<WaitingStaff>(`${this.apiServerUrl}waitingStaff/save`, waitingStaff, httpOptions);
    }
  
    public deleteWaitingStaff(WaitingStaffId: string): Observable<void>{
      //console.log(chefId);
      return this.http.delete<void>(`${this.apiServerUrl}waitingStaff/delete/${WaitingStaffId}`, httpOptions);
    }
  }
  