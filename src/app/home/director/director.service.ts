import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

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

  getDirectorList(params) {
    const httpParams = this.getHttpParams(params);
    return this.http.get(`/directors`, {
      params: httpParams,
    });
  }

  getDirectorDetails(id) {
    return this.http.get(`/directors/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateDirectorDetails(id, data) {
    return this.http.put(`/directors/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createDirector(data){
    return this.http.post(`/directors`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteDirector(id) {
    return this.http.delete(`/directors/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
