import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginBoxComponent } from './login-box/login-box.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AdminModule } from './admin/admin.module';
import { LaboratoriumModule } from './laboratorium/laboratorium.module';
import { LaboratoriumManagerModule } from "./laboratorium-manager/laboratorium-manager.module";
import { LekarzModule } from './lekarz/lekarz.module';
import { RecepcjaModule } from './recepcja/recepcja.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth-interceptor';
import { RouteGuard } from './Guard/route-guard';
import { AdminGuard } from './Guard/admin-guard';
import { DoctorGuard } from './Guard/doctor-guard';
import { LabWGuard } from './Guard/labw-guard';
import { LabMGuard } from './Guard/labm-guard';
import { RecpGuard } from './Guard/recp-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginBoxComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
  providers: [
    RouteGuard,
    AdminGuard,
    DoctorGuard,
    LabWGuard,
    LabMGuard,
    RecpGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
