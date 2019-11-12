import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

export interface userType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private openAddUserDialogRef: MatDialogRef<AddUserComponent>, private _snackBar: MatSnackBar) { }

  public addUserDialogCancel() {
    this.openAddUserDialogRef.close({reason: "cancel"});
    this.openSnackBar("Anulowano", "Ok");
  }
  
  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openAddUserDialogRef.close({reason: "save"});
    this.openSnackBar("Dodano nowego użytkownika", "Ok");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

  userTypes: userType[] = [
    { value: 'admin-0', viewValue: 'Admin' },
    { value: 'lekarz-1', viewValue: 'Lekarz' },
    { value: 'recepcja-2', viewValue: 'Recepcja' },
    { value: 'lab-3', viewValue: 'Laborant' },
    { value: 'lab_kier-4', viewValue: 'Kierownik Laboratorium' }
  ];
}

