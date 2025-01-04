import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthDetails } from '../model/authdetails';

const API_URL = environment.apiUrl + "/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accountSubject: BehaviorSubject<AuthDetails>;

  constructor(private router: Router, private http: HttpClient) { 
    this.accountSubject = new BehaviorSubject<AuthDetails>(JSON.parse(sessionStorage.getItem('userDetail')));
  }

  public get accountValue(): AuthDetails {
    this.accountSubject = new BehaviorSubject<AuthDetails>(JSON.parse(sessionStorage.getItem('userDetail')));
    return this.accountSubject.value;
  }

  public login(formData:any): Observable<any>{
    return this.http.post(API_URL+'/login', formData);
  }

  public logout(){
    sessionStorage.removeItem('userDetail');
    this.accountSubject.next(null);
    this.router.navigate(['/login']);
  }
}
