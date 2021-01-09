import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { LanguageComponent } from './language.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { LanguageRoutingModule } from './language-routing.module';



@NgModule({
  declarations: [LanguageComponent, AddLanguageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LanguageRoutingModule
  ]
})
export class LanguageModule { }
