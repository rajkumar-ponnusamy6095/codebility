import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  error: string | undefined;
  userForm!: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log('row data: ', this.data);
    this.getUserDetails(this.data.id);
  }

  getUserDetails(id) {
    this.userService.getUserDetails(id).subscribe((res: any) => {
      this.userForm.patchValue({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        gender: res.gender,
      });
    });
  }

  ngOnDestroy() {}

  updateUser() {
    this.userService
      .updateUserDetails(this.data.id, this.userForm.value)
      .subscribe(
        (res) => {
          console.log('response received: ', res);
          this.dialogRef.close();
        },
        (error) => {
          console.log('error received: ', error);
          this.error = error;
        }
      );
    console.log('form values: ', this.userForm.value);
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      gender: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
}
