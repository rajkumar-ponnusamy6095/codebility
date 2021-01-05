import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root',
})
export class AdministrationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.credentialsService.isAdmin()) {
      return true;
    }
    console.log(
      'Not having the access to this module, check is the user is admin or not'
    );
    if (this.credentialsService.credentials.role == 'User') {
      this.router.navigate(['/about']);
    }
    return false;
  }
}
