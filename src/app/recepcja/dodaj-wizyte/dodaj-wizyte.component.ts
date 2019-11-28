import { Component, OnInit } from '@angular/core';
import { DodajPacjentaComponent } from '../dodaj-pacjenta/dodaj-pacjenta.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IVisitRegister } from 'src/app/Form/IVisitRegister';
import { PatientDTO } from 'src/app/DTO/PatientDTO';
import { PersonDTO } from 'src/app/DTO/PersonDTO';


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

  public onSubmit(value: IVisitRegister): void {
    if (!this.form.valid) return;
    this._db.VisitRegister(value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  loadData() {
    this._db.PatientAll().subscribe({
      next: this.handlePatients.bind(this),
      error: this.handleError.bind(this)
    })

    this._db.DoctorAll().subscribe({
      next: this.handleDoctors.bind(this),
      error: this.handleError.bind(this)
    })
  }

  ngOnInit() {
    this.buildForm();
    this.loadData();
  }

  private handleResponse(): void {

    this.openSnackBar("Wizyta pacjenta " + this.form.get("Patient").value + " została zarejestrowana", "Ok");
  }

  private handlePatients(dataPat: PatientDTO[]) {
    console.log(dataPat);
    this.patients = dataPat;
  }

  private handleDoctors(data: PersonDTO[]) {
    console.log(data);
    this.doctors = data;
  }

  private handleError(err: HttpErrorResponse): void {
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

  doctors: PersonDTO[];

  patients: PatientDTO[];

  public filteredList1 = this.patients;
  public filteredList2 = this.doctors;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
