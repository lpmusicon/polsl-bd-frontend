import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { UserDTO } from 'src/app/DTO/UserDto';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INewPassword } from 'src/app/Form/INewPassword';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrls: ['./reset-password-user.component.scss']
})
export class ResetPasswordUserComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private openResetPasswordDialogRef: MatDialogRef<ResetPasswordUserComponent>,
    private _snackBar: MatSnackBar,
    private _db: DbCommunicationService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: UserDTO) { }

  ngOnInit() {
    this.form = this._fb.group({
      NewPassword: ['', Validators.required]
    });
  }

  public resetPasswordDialogCancel() {
    this.openResetPasswordDialogRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "");
  }

  public onSubmit(value: INewPassword): void {
    if (!this.form.valid)
      return;

    this._db.UserPasswd(this.user.userId, value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  private handleResponse() {
    this.openResetPasswordDialogRef.close({ reason: "save" });
    this.openSnackBar(`Hasło ${this.user.login} zostało zresetowane`, "Ok");
  }

  private handleError(err: HttpErrorResponse) {
    switch (err.status) {
      case 404:
        this.openSnackBar("Nie znaleziono użytkownika", "Ok");
        break;
      case 400:
        this.openSnackBar("Niepoprawne dane, spróbuj ponownie", "Ok");
        break;
      default:
        this.openSnackBar("Wystąpił błąd, spróbuj ponownie", "Ok");
        break;
    }
    console.warn(err);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
