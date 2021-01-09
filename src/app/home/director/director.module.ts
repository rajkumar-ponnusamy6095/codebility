import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DirectorComponent } from './director.component';
import { DirectorRoutingModule } from './director-routing.module';
import { AddDirectorComponent } from './add-director/add-director.component';



@NgModule({
  declarations: [DirectorComponent, AddDirectorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DirectorRoutingModule
  ]
})
export class DirectorModule { }
