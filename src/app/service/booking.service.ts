import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Booking } from "../models/booking.model";


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('booking-admin:12345')
      
    })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class BookingService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getBookings(): Observable<Booking[]>{
      return this.http.get<Booking[]>(`${this.apiServerUrl}booking/all`, httpOptions);
    }
  
    public addBooking(booking: Booking): Observable<Booking>{
      return this.http.post<Booking>(`${this.apiServerUrl}booking/save`, booking, httpOptions);
    }
  
    public deleteBooking(bookingId: string): Observable<void>{
      //console.log(bookingId);
      return this.http.delete<void>(`${this.apiServerUrl}booking/delete/${bookingId}`, httpOptions);
    }
  }
  