import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { PatientVisitDTO } from 'src/app/DTO/PatientVisitDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IVisitCancel } from 'src/app/Form/IVisitCancel';
import { HttpErrorResponse } from '@angular/common/http';

class dialogData {
  visit: PatientVisitDTO
}

@Component({
  selector: 'app-cancel-visit',
  templateUrl: './cancel-visit.component.html',
  styleUrls: ['./cancel-visit.component.scss']
})
export class CancelVisitComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private ref: MatDialogRef<CancelVisitComponent>,
    private db: DbCommunicationService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: dialogData
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      Reason: ['', Validators.required]
    });
  }

  public onSubmit(value: IVisitCancel): void {
    if (!this.form.valid) { return; }

    this.db.VisitCancel(this.data.visit.patientVisitId, value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });

  }

  private handleResponse(): void {
    this.ref.close({ id: 1 });
  }

  private handleError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 404:
        this.openSnackBar('Nie znaleziono wizyty', 'Ok');
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
  }

  public close() {
    this.ref.close({ id: 0 });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
