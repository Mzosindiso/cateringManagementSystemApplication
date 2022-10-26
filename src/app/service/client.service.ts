import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Client } from "../models/client.models";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('client-admin:12345')
      
    })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class ClientService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getClients(): Observable<Client[]>{
      return this.http.get<Client[]>(`${this.apiServerUrl}client/all`, httpOptions);
    }
  
    public addClient(client: Client): Observable<Client>{
      return this.http.post<Client>(`${this.apiServerUrl}client/save`, client, httpOptions);
    }
  
    public deleteClient(clientId: string): Observable<void>{
      //console.log(clientId);
      return this.http.delete<void>(`${this.apiServerUrl}client/delete/${clientId}`, httpOptions);
    }
  }