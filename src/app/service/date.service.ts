import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Date } from '../models/date.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('date-admin:12345')
      
    })
  };

  @Injectable({
    providedIn: 'root'
  })

  export class DateService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getDates(): Observable<Date[]>{
      return this.http.get<Date[]>(`${this.apiServerUrl}date/all`, httpOptions);
    }
  
    public addDate(date: Date): Observable<Date>{
      return this.http.post<Date>(`${this.apiServerUrl}date/save`, date, httpOptions);
    }
  
    public deleteDate(dateId: string): Observable<void>{
      //console.log(dateId);
      return this.http.delete<void>(`${this.apiServerUrl}date/delete/${dateId}`, httpOptions);
    }
  }