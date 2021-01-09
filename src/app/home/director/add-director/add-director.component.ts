import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectorService } from '../director.service';
@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.component.html',
  styleUrls: ['./add-director.component.scss']
})
export class AddDirectorComponent implements OnInit {

  error: string | undefined;
  directorForm!: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AddDirectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dirService: DirectorService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log('row data: ', this.data);
    if(this.data.action == 'EDIT') {
      this.getDirectorDetials(this.data.info.id);
    }  
  }

  getDirectorDetials(id) {
    this.dirService.getDirectorDetails(id).subscribe((res: any) => {
      this.directorForm.patchValue({
        firstName: res.firstName,
        lastName: res.lastName  
      });
    });
  }

  ngOnDestroy() {}

  updateDirector() {
    if(this.data.action == 'EDIT') {
    this.dirService
      .updateDirectorDetails(this.data.info.id, this.directorForm.value)
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
    console.log('form values: ', this.directorForm.value);
  } else {
    this.dirService
    .createDirector(this.directorForm.value)
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
  console.log('form values: ', this.directorForm.value);
  }
}

  private createForm() {
    this.directorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]     
    });
  }

}
