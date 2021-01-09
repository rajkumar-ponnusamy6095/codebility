import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

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
  
    getLanguageList(params) {
      const httpParams = this.getHttpParams(params);
      return this.http.get(`/languages`, {
        params: httpParams,
      });
    }
  
    getLanguageDetails(id) {
      return this.http.get(`/languages/${id}`).pipe(
        map((res: any) => {
          return res;
        })
      );
    }
  
    updateLanguageDetails(id, data) {
      return this.http.put(`/languages/${id}`, data).pipe(
        map((res: any) => {
          return res;
        })
      );
    }

    createLanguage(data){
      return this.http.post(`/languages`, data).pipe(
        map((res: any) => {
          return res;
        })
      );
    }
  
    deleteLanguage(id) {
      return this.http.delete(`/languages/${id}`).pipe(
        map((res: any) => {
          return res;
        })
      );
    }

  }
  
