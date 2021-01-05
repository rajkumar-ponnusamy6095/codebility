import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error: string | undefined;
  registerForm!: FormGroup;
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

  register() {
    // this.isLoading = true;
    this.authenticationService.register(this.registerForm.value).subscribe(
      (credentials) => {
        console.log('response received: ', credentials);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('error received: ', error);
        this.error = error;
      }
    );
    console.log('form values: ', this.registerForm.value);
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      gender: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      acceptTerms: ['', Validators.requiredTrue],
    });
  }
}
