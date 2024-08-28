import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  userRegister(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}userSignUp`,data)
  }
  userLogin(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}userLogin`,data)
  }
  getUsers():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}getAllUsers`)
  }
}
