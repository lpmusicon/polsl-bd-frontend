import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-pacjenta',
  templateUrl: './dodaj-pacjenta.component.html',
  styleUrls: ['./dodaj-pacjenta.component.scss']
})
export class DodajPacjentaComponent implements OnInit {

  constructor(
    private openAddPatientDialogRef: MatDialogRef<DodajPacjentaComponent>, 
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar
    ) { }

  public addPatientDialogCancel() {
    this.openAddPatientDialogRef.close({reason: "cancel"});
    this.openSnackBar("Anulowano", "Ok");
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

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Name: ['', Validators.required],
      LastName: ['', Validators.required],
      PESEL: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  //TODO replace any
private handleResponse(auth: any): void {

  this.openSnackBar("Dodano pacjenta " + this.form.get("Name").value + " " + this.form.get("Last").value, "Ok");
  window.setTimeout(() => {

  this._router.navigate(["/recepcja/addvisit"]);
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

}
