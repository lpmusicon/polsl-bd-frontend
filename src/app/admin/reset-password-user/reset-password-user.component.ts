import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrls: ['./reset-password-user.component.scss']
})
export class ResetPasswordUserComponent implements OnInit {

  constructor(private openResetPasswordDialogRef: MatDialogRef<ResetPasswordUserComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public resetPasswordDialogCancel() {
    this.openResetPasswordDialogRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openResetPasswordDialogRef.close({ reason: "save" });
    this.openSnackBar("Hasło użytkownika "+ this.data.user.name +" zostało zresetowane", "Ok");
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
