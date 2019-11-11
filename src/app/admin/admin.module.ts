import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ResetPasswordUserComponent } from './reset-password-user/reset-password-user.component';
import { SetExpiryDateUserComponent } from './set-expiry-date-user/set-expiry-date-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    AddUserComponent,
    ListUserComponent,
    ResetPasswordUserComponent,
    SetExpiryDateUserComponent
  ],
  imports: [
    MaterialModule,
    AdminRoutingModule,
    CommonModule
  ],
  entryComponents: [
    AddUserComponent,
    ResetPasswordUserComponent,
    SetExpiryDateUserComponent
  ]
})
export class AdminModule { }
