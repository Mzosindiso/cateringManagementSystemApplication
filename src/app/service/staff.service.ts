import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('staff-admin:12345')
    
  })
};

@Injectable({
  providedIn: 'root'
})


export class StaffService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getStaffs(): Observable<Staff[]>{
      return this.http.get<Staff[]>(`${this.apiServerUrl}staff/all`, httpOptions);
    }
  
    public addStaff(staff: Staff): Observable<Staff>{
      return this.http.post<Staff>(`${this.apiServerUrl}staff/save`, staff, httpOptions);
    }
  
    public deleteStaff(staffId: string): Observable<void>{
      //console.log(staffId);
      return this.http.delete<void>(`${this.apiServerUrl}staff/delete/${staffId}`, httpOptions);
    }
  }
  