import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-set-expiry-date-user',
  templateUrl: './set-expiry-date-user.component.html',
  styleUrls: ['./set-expiry-date-user.component.scss']
})
export class SetExpiryDateUserComponent implements OnInit {

  constructor(private openSetExpiryDateDialogRef: MatDialogRef<SetExpiryDateUserComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public setExpiryDateCancel() {
    this.openSetExpiryDateDialogRef.close({reason: "cancel"});
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openSetExpiryDateDialogRef.close({ reason: "save" });
    this.openSnackBar("Data wygaśnięcia konta "+ this.data.user.name +" została zmieniona", "Ok");
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
