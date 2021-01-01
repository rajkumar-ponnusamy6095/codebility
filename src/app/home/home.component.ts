import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../core/authentication.service';
import { CredentialsService } from '../core/credentials.service';
import { MediaObserver } from '@angular/flex-layout';
import { OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostBinding('class') componentCssClass;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private media: MediaObserver,
    public overlayContainer: OverlayContainer
  ) { }

  ngOnInit(): void {
    this.onSetTheme('light-theme');
  }

  

  onSetTheme(theme) {
      this.overlayContainer.getContainerElement().classList.add(theme);
      this.componentCssClass = theme;
    }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.email : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }

}
