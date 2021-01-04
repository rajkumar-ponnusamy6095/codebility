import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  version: string | null = environment.version;
  error: string | undefined;
  resetPasswordForm!: FormGroup;
  isLoading = false;
  token: string;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log("params: ",params)
      console.log(this.token); // Print the parameter to the console. 
  });
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  resetPassword() {
    // this.isLoading = true;
    let data = {
      token: this.token,
      password: this.resetPasswordForm.value['password'],
      confirmPassword: this.resetPasswordForm.value['confirmPassword']
    }
    this.authenticationService.resetPassword(data).subscribe(
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
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]     
    });
  }

}
