import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../models/manager.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('manager-admin:12345')
    
  })
};

@Injectable({
  providedIn: 'root'
})


export class ManagerService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getManagers(): Observable<Manager[]>{
      return this.http.get<Manager[]>(`${this.apiServerUrl}manager/all`, httpOptions);
    }
  
    public addManager(manager: Manager): Observable<Manager>{
      return this.http.post<Manager>(`${this.apiServerUrl}manager/save`, manager, httpOptions);
    }
  
    public deleteManager(managerId: string): Observable<void>{
      //console.log(managerId);
      return this.http.delete<void>(`${this.apiServerUrl}manager/delete/${managerId}`, httpOptions);
    }
  }
  