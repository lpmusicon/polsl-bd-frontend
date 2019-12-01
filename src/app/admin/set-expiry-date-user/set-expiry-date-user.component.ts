import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { UserDTO } from 'src/app/DTO/UserDto';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IDisabledTo } from 'src/app/Form/IDisabledTo';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-set-expiry-date-user',
  templateUrl: './set-expiry-date-user.component.html',
  styleUrls: ['./set-expiry-date-user.component.scss']
})
export class SetExpiryDateUserComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private openSetExpiryDateDialogRef: MatDialogRef<SetExpiryDateUserComponent>,
    private _snackBar: MatSnackBar,
    private _db: DbCommunicationService,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public user: UserDTO) { }

  ngOnInit() {
    this.form = this._fb.group({
      disabledTo: [this.user.disabledTo, Validators.required]
    });
  }

  public setExpiryDateCancel() {
    this.openSetExpiryDateDialogRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "");
  }

  public onSubmit(value: IDisabledTo): void {
    if (!this.form.valid)
      return;

    this._db.UserDisable(this.user.userId, value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handleResponse() {
    this.openSetExpiryDateDialogRef.close({ reason: "save" });
    this.openSnackBar(`Data wygaśnięcia konta ${this.user.login} została zmieniona`, "Ok");
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
