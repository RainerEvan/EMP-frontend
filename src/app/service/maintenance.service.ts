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

  getListMaintenanceGroup(): Observable<any> {
    return this.http.get(`${this.baseUrl}/maintenance/group`);
  }

  getMaintenanceGroupDetail(maintenanceGroupId:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/maintenance/group/${maintenanceGroupId}`);
  }

  addMaintenanceGroup(maintenanceGroup: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/maintenance/group`, maintenanceGroup);
  }

  updateMaintenanceGroup(maintenanceGroupId: string, maintenanceGroup: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/maintenance/group/${maintenanceGroupId}`, maintenanceGroup);
  }

  deleteMaintenanceGroup(maintenanceGroupId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/maintenance/group/${maintenanceGroupId}`);
  }

  getListMaintenanceParam(maintenanceGroupId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/maintenance/param/${maintenanceGroupId}`);
  }

  addMaintenanceParam(maintenanceParam: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/maintenance/param`, maintenanceParam);
  }

  updateMaintenanceParam(maintenanceParam: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/maintenance/param`, maintenanceParam);
  }

  deleteMaintenanceParam(maintenanceParamCd: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/maintenance/param/${maintenanceParamCd}`);
  }
}
