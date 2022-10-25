import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chef } from '../models/chef.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('chef-admin:12345')
    
  })
};

@Injectable({
  providedIn: 'root'
})

export class ChefService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getChefs(): Observable<Chef[]>{
    return this.http.get<Chef[]>(`${this.apiServerUrl}chef/all`, httpOptions);
  }

  public addChef(chef: Chef): Observable<Chef>{
    return this.http.post<Chef>(`${this.apiServerUrl}chef/save`, chef, httpOptions);
  }

  public deleteChef(chefId: string): Observable<void>{
    //console.log(chefId);
    return this.http.delete<void>(`${this.apiServerUrl}chef/delete/${chefId}`, httpOptions);
  }
}
