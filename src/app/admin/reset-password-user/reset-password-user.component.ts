import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrls: ['./reset-password-user.component.scss']
})
export class ResetPasswordUserComponent implements OnInit {

  constructor(private openResetPasswordDialogRef: MatDialogRef<ResetPasswordUserComponent>) { }

  public resetPasswordDialogCancel() {
    this.openResetPasswordDialogRef.close();
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openResetPasswordDialogRef.close({ podajeHaslo: "okon" });
  }

  ngOnInit() {
  }

}
