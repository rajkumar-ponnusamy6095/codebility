import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient } from '@angular/common/http';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext) {
    // Replace by proper authentication call
    const data = {
      email: context.email,
      password: context.password,
    };
    return this.http.post(`/accounts/authenticate`, data).pipe(
      map((res: any) => {
        let userData = {
          email: context.email,
          token: res.jwtToken,
        };
        console.log('RES: ', res);
        this.credentialsService.setCredentials(userData, context.remember);
        return of(res);
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
