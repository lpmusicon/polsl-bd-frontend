import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(
    private openAddUserDialogRef: MatDialogRef<AddUserComponent>, 
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar
    ) { }

  public addUserDialogCancel() {
    this.openAddUserDialogRef.close({reason: "cancel"});
    this.openSnackBar("Anulowano", "Ok");
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Login: ['', Validators.required],
      Name: ['', Validators.required],
      LastName: ['', Validators.required],
      UserType: ['', Validators.required],
      NewPassword: ['', Validators.required]
    });
  }
  
  //TODO replace any
  public onSubmit(value: any): void {
    if (!this.form.valid) return;
    //TODO db
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  //TODO replace any
  private handleResponse(auth: any): void {


    this.openSnackBar("Dodano użytkownika " + this.form.get("Login").value, "Ok");
    window.setTimeout(() => {

this._router.navigate(["/admin"]);


    }, 1000);
  }

private handleAuthError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 400:
        //Złe dane
        this.openSnackBar("Niepoprawne dane/brak danych", "Ok");
        console.warn("Wrong/empty data");
        break;
      default:
        //Nieokreślony błąd
        this.openSnackBar("Wystąpił nieokreślony błąd", "Ok");
        console.warn("Generic error");
        break;
    }
    console.warn(err);
  }

  userTypes: userType[] = [
    { value: 'admin-0', viewValue: 'Admin' },
    { value: 'lekarz-1', viewValue: 'Lekarz' },
    { value: 'recepcja-2', viewValue: 'Recepcja' },
    { value: 'lab-3', viewValue: 'Laborant' },
    { value: 'lab_kier-4', viewValue: 'Kierownik Laboratorium' }
  ];
}

