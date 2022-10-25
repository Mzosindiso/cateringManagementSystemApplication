import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaitingStaff } from '../models/waitingStaff.model';

@Injectable({
  providedIn: 'root'
})
export class WaitingStaffService {
  private apiServerUrl = '';

  constructor(private http: HttpClient) { }

  public getWaitingStaffs(): Observable<WaitingStaff[]>{
    return this.http.get<WaitingStaff[]>(`${this.apiServerUrl}/waitingStaff/all`);
  }

  public addWaitingStaff(waitingStaff: WaitingStaff): Observable<WaitingStaff>{
    return this.http.post<WaitingStaff>(`${this.apiServerUrl}/waitingStaff/add`, waitingStaff);
  }

  public updateWaitingStaff(waitingStaff: WaitingStaff): Observable<WaitingStaff>{
    return this.http.put<WaitingStaff>(`${this.apiServerUrl}/waitingStaff/update`, waitingStaff);
  }

  public deleteWaitingStaff(waitingStaffId: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/waitingStaff/delete/${waitingStaffId}`);
  }
}
