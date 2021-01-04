import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  version: string | null = environment.version;
  error: string | undefined;
  forgotPasswordForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  forgotPassword() {
    // this.isLoading = true;
    this.authenticationService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (credentials) => {
        console.log('response received: ', credentials);
        this.router.navigate(
          [this.route.snapshot.queryParams.redirect || '/'],
          { replaceUrl: true }
        );
      },
      (error) => {
        console.log('error received: ', error);
        this.error = error;
      }
    );
  }

  private createForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]          
    });
  }
}
