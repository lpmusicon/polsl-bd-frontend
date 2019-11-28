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
    private router: Router,
    private fb: FormBuilder,
    private db: DbCommunicationService,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.patient) {
        console.log('Patient: ', params.patient);
      }
      console.log('Par: ', params);
    });
  }

  public form: FormGroup;
  public doctors: PersonDTO[];
  public patients: PatientDTO[];
  public filteredList1 = this.patients;
  public filteredList2 = this.doctors;

  private buildForm(): void {
    this.form = this.fb.group({
      PatientId: ['', Validators.required],
      DoctorId: ['', Validators.required]
    });
  }

  public logout(): void {
    this.db.logout();
    this.router.navigate(['/']);
  }

  public onSubmit(value: IVisitRegister): void {
    if (!this.form.valid) { return; }
    this.db.VisitRegister(value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  loadData() {
    this.db.PatientAll().subscribe({
      next: this.handlePatients.bind(this),
      error: this.handleError.bind(this)
    });

    this.db.DoctorAll().subscribe({
      next: this.handleDoctors.bind(this),
      error: this.handleError.bind(this)
    });
  }

  ngOnInit() {
    this.buildForm();
    this.loadData();
  }

  private handleResponse(): void {
    this.openSnackBar(`Wizyta pacjenta ${this.form.get('PatientId').value} została zarejestrowana`, 'Ok');
    this.router.navigate(['/recepcja']);
  }

  private handlePatients(dataPat: PatientDTO[]) {
    for (const patient of dataPat) {
      patient.fullName = `${patient.name} ${patient.lastname}`;
    }
    this.patients = dataPat;
    this.filteredList1 = dataPat;
  }

  private handleDoctors(data: PersonDTO[]) {
    console.log(data);
    for (const doc of data) {
      doc.fullName = `${doc.name} ${doc.lastname}`;
    }
    this.doctors = data;
    this.filteredList2 = data;
  }

  private handleError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 404:
        this.openSnackBar('Nie znaleziono pacjenta lub lekarza', 'Ok');
        break;
      case 400:
        // Złe dane
        this.openSnackBar('Niepoprawne dane/brak danych', 'Ok');
        console.warn('Wrong/empty data');
        break;
      default:
        // Nieokreślony błąd
        this.openSnackBar('Wystąpił nieokreślony błąd', 'Ok');
        console.warn('Generic error');
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
      this.loadData();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
