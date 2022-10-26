import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('payment-admin:12345')
      
    })
  };

  @Injectable({
    providedIn: 'root'
  })

  export class PaymentService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getPayments(): Observable<Payment[]>{
      return this.http.get<Payment[]>(`${this.apiServerUrl}payment/all`, httpOptions);
    }
  
    public addPayment(payment: Payment): Observable<Payment>{
      return this.http.post<Payment>(`${this.apiServerUrl}payment/save`, payment, httpOptions);
    }
  
    public deletePayment(paymentId: string): Observable<void>{
      //console.log(paymentId);
      return this.http.delete<void>(`${this.apiServerUrl}payment/delete/${paymentId}`, httpOptions);
    }
  }