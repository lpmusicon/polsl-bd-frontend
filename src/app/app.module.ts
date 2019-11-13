import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginBoxComponent } from './login-box/login-box.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AdminModule } from './admin/admin.module';
import { LaboratoriumModule } from './laboratorium/laboratorium.module';
import { LaboratoriumManagerModule } from "./laboratorium-manager/laboratorium-manager.module";
import { LekarzModule } from './lekarz/lekarz.module';
import { RecepcjaModule } from './recepcja/recepcja.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginBoxComponent
  ],
  imports: [
    FormsModule,
    AdminModule,
    LaboratoriumModule,
    LaboratoriumManagerModule,
    LekarzModule,
    RecepcjaModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
