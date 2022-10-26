import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entertainment } from '../models/entertainment.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('entertainment-admin:12345')
    
  })
};

@Injectable({
  providedIn: 'root'
})

export class EntertainmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEntertainments(): Observable<Entertainment[]>{
    return this.http.get<Entertainment[]>(`${this.apiServerUrl}entertainment/all`, httpOptions);
  }

  public addEntertainment(entertainment: Entertainment): Observable<Entertainment>{
    return this.http.post<Entertainment>(`${this.apiServerUrl}entertainment/save`, entertainment, httpOptions);
  }

  public deleteEntertainment(entertainmentId: string): Observable<void>{
    //console.log(EntertainmentId);
    return this.http.delete<void>(`${this.apiServerUrl}entertainment/delete/${entertainmentId}`, httpOptions);
  }
}
