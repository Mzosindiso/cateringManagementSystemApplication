import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('login-admin:12345')
      
    })
  };

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getLogins(): Observable<Login[]>{
    return this.http.get<Login[]>(`${this.apiServerUrl}login/all`, httpOptions);
  }

  public addLogin(login: Login): Observable<Login>{
    return this.http.post<Login>(`${this.apiServerUrl}login/save`, login, httpOptions);
  }

  public deleteLogin(loginId: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}login/delete/${loginId}`, httpOptions);
  }
}
