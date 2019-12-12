import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IPatientRegister } from 'src/app/Form/IPatientRegister';

@Component({
  selector: 'app-dodaj-pacjenta',
  templateUrl: './dodaj-pacjenta.component.html',
  styleUrls: ['./dodaj-pacjenta.component.scss']
})
export class DodajPacjentaComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private openAddPatientDialogRef: MatDialogRef<DodajPacjentaComponent>,
    private router: Router,
    private fb: FormBuilder,
    private db: DbCommunicationService,
    private snackBar: MatSnackBar
  ) { }

  public addPatientDialogCancel() {
    this.openAddPatientDialogRef.close({ reason: 'cancel' });
    this.openSnackBar('Anulowano', 'Ok');
  }

  public onSubmit(value: IPatientRegister): void {
    console.log(value);
    if (!this.form.valid) { return; }

    this.db.PatientRegister(value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      LastName: ['', Validators.required],
      PESEL: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]')]]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  private handleResponse(): void {
    this.openSnackBar(`Dodano pacjenta ${this.form.get('Name').value} ${this.form.get('LastName').value}`, 'Ok');
    this.openAddPatientDialogRef.close();
  }

  private handleError(err: HttpErrorResponse): void {
    switch (err.status) {
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

}
