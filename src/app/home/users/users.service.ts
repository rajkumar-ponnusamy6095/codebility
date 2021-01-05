import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private getHttpParams(params) {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const element = params[key];
        httpParams = httpParams.set(key, element);
      }
    }
    return httpParams;
  }

  getUsersList(params) {
    const httpParams = this.getHttpParams(params);
    return this.http.get(`/accounts`, {
      params: httpParams,
    });
  }

  getUserDetails(id) {
    return this.http.get(`/accounts/${id}`).pipe(map((res: any)=>{
      return res;
    }));
  }

  updateUserDetails(id, data) {
    return this.http.put(`/accounts/${id}`, data).pipe(map((res: any)=>{
      return res;
    }));
  }

  deleteUser(id) {
    return this.http.delete(`/accounts/${id}`).pipe(map((res: any)=>{
      return res;
    }));
  }
}
