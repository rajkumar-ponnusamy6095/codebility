import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (response.status == 401) {
      this.authService.logout().subscribe((res: any)=>{
        this.router.navigate(['/login'])
      })
    } else if(response.status == 500) {
      this.router.navigate(['/server-error'])
    } else if(response.status == 504) {
      this.router.navigate(['/server-error'])
    }
    throw response;
  }
}
