import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { InternetErrorComponent } from './internet-error/internet-error.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
    InternetErrorComponent
  ],
  imports: [
    BrowserModule,    
    MaterialModule, 
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule, 
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
