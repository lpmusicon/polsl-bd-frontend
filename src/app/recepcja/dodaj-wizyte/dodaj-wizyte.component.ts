import { Component, OnInit } from '@angular/core';
import { DodajPacjentaComponent } from '../dodaj-pacjenta/dodaj-pacjenta.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';


export interface Doctor {
  value: string;
  viewValue: string;
}

export interface Patient {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dodaj-wizyte',
  templateUrl: './dodaj-wizyte.component.html',
  styleUrls: ['./dodaj-wizyte.component.scss']
})
export class DodajWizyteComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["patient"]) {
        console.log("Patient: ", params["patient"]);
      }
      console.log("Par: ", params);
    })
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Patient: ['', Validators.required],
      Doctor: ['', Validators.required]
    });
  }

  public logout(): void {
    this._db.logout();
    this._router.navigate(['/']);
  }

  //TODO replace any
  public onSubmit(value: any): void {
    if (!this.form.valid) return;
    //TODO db

  }

  ngOnInit() {
    this.buildForm();
  }

  //TODO replace any
  private handleResponse(auth: any): void {

    this.openSnackBar("Wizyta pacjenta " + this.form.get("Patient").value + " została zarejestrowana", "Ok");
    window.setTimeout(() => {

      this._router.navigate(["/recepcja"]);
    }, 1000);
  }

  private handleAuthError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 404:
        this.openSnackBar("Nie znaleziono pacjenta lub lekarza", "Ok");
        break;
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

  openAddPatientDialog(): void {
    const openAddpatientDialogRef = this.dialog.open(DodajPacjentaComponent, {
      width: '650px',
    });

    openAddpatientDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  doctors: Doctor[] = [
    { value: 'doc-1', viewValue: 'Jaracz' },
    { value: 'doc-2', viewValue: 'Zjadacz' },
    { value: 'doc-3', viewValue: 'Podpalacz' },
    { value: 'doc-4', viewValue: 'Laborant' },
    { value: 'doc-5', viewValue: 'Kierownik Laboratorium' }
  ];

  patients: Patient[] = [
    { value: 'pat-1', viewValue: 'Jaracz' },
    { value: 'pat-2', viewValue: 'Zjadacz' },
    { value: 'pat-3', viewValue: 'Podpalacz' },
    { value: 'pat-4', viewValue: 'Laborant' },
    { value: 'pat-5', viewValue: 'Kierownik Laboratorium' }
  ];

  public filteredList1 = this.patients.slice();
  public filteredList2 = this.doctors.slice();

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
