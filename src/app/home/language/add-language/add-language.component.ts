import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent implements OnInit {

  error: string | undefined;
  languageForm!: FormGroup;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AddLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private langService: LanguageService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log('row data: ', this.data);
    if(this.data.action == 'EDIT') {
      this.getLanguageDetails(this.data.info.id);
    }  
  }

  getLanguageDetails(id) {
    this.langService.getLanguageDetails(id).subscribe((res: any) => {
      this.languageForm.patchValue({
        name: res.name       
      });
    });
  }

  ngOnDestroy() {}

  updateLanguage() {
    if(this.data.action == 'EDIT') {
    this.langService
      .updateLanguageDetails(this.data.info.id, this.languageForm.value)
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
    console.log('form values: ', this.languageForm.value);
  } else {
    this.langService
    .createLanguage(this.languageForm.value)
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
  console.log('form values: ', this.languageForm.value);
  }
}

  private createForm() {
    this.languageForm = this.formBuilder.group({
      name: ['', Validators.required]     
    });
  }

}
