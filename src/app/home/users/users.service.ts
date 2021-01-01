import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  private getHttpParams(params) {
    let httpParams = new HttpParams();
    for( const key in params) {
      if(params.hasOwnProperty(key)) {
        const element = params[key];
        httpParams = httpParams.set(key, element);
      }
    }
    return httpParams;
  }

  getUsersList(params) {
    const httpParams = this.getHttpParams(params);
    return this.http.get(`/users`, {
      params: httpParams
    });
  }
}
