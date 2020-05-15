import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassportApi {

  constructor(private http: HttpClient) { }

  login(auth: {username: string, password: string}) {
    return this.http.post<{access_token: string}>(environment.contextPath.monitor + '/auth/login', auth, {params: {passport_allowed: true} as any});
  }

  getCurrentUser() {
    return this.http.get<any>(environment.contextPath.monitor + '/users/current');
  }
}
