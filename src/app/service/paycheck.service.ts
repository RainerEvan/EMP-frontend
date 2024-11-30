import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaycheckService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListPaycheck(employeeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/paycheck/${employeeId}`);
  }

  getPaycheckDetail(paycheckId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/paycheck/detail/${paycheckId}`);
  }

  getPaycheckReport(paycheckId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/paycheck/report/${paycheckId}`);
  }

  addPaycheck(paycheck: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/paycheck`, paycheck);
  }

  updatePaycheck(paycheckId: string, paycheck: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/paycheck/${paycheckId}`, paycheck);
  }

  deletePaycheck(paycheckId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/paycheck/${paycheckId}`);
  }
}
