import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CredentialsService } from '../credentials.service';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private credentialService: CredentialsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      const token = JSON.parse(localStorage.getItem('admin-credentials'));
      if (token) {
        request = request.clone({
          url: environment.serverUrl + request.url,
          setHeaders: {
            Authorization: token.token,
          },
        });
        console.log('REQUEST with auth: ', request);
      } else {
        request = request.clone({ url: environment.serverUrl + request.url });
        console.log('REQUEST without auth: ', request);
      }
    }
    return next.handle(request);
  }
}
