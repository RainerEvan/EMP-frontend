import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListEmployee(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee`);
  }

  getEmployeeDetail(employeeId:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/${employeeId}`);
  }

  getEmployeeProfileImage(employeeId:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee/profile-image/${employeeId}`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee`, employee);
  }

  updateEmployee(employeeId: string, employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/employee/${employeeId}`, employee);
  }

  updateEmployeeProfileImage(employeeId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/employee/profile-image/${employeeId}`, formData);
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employee/${employeeId}`);
  }
}
