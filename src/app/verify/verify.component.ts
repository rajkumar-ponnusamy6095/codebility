import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  token: string;
  verified: boolean = false;
  loading: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
      console.log('params: ', params);
      console.log(this.token); // Print the parameter to the console.
    });
  }

  ngOnInit(): void {
    this.verifyAccount();
  }

  verifyAccount() {
    let data = {
      token: this.token,
    };
    this.authenticationService.verifyAccount(data).subscribe(
      (res: any) => {
        console.log('res: ', res);
        this.verified = true;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        console.log('err: ', error);
        this.verified = false;
        this.loading = false;
      }
    );
  }
}
