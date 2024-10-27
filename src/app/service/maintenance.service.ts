import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employees`, employee);
  }

  updateEmployee(id: string, employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/employees/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }
}
