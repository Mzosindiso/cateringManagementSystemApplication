import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('admin-admin:12345')
      
    })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class AdminService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getAdmins(): Observable<Admin[]>{
      return this.http.get<Admin[]>(`${this.apiServerUrl}admin/all`, httpOptions);
    }
  
    public addAdmin(admin: Admin): Observable<Admin>{
      return this.http.post<Admin>(`${this.apiServerUrl}admin/save`, admin, httpOptions);
    }
  
    public deleteAdmin(adminNum: string): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}admin/delete/${adminNum}`, httpOptions);
    }
  }
  