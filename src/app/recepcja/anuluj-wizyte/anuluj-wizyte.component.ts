import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IVisitCancel } from 'src/app/Form/IVisitCancel';
import { Visit } from 'src/app/recepcja/lista-wizyt/lista-wizyt.component';

@Component({
  selector: 'app-anuluj-wizyte',
  templateUrl: './anuluj-wizyte.component.html',
  styleUrls: ['./anuluj-wizyte.component.scss']
})
export class AnulujWizyteComponent implements OnInit {

  constructor(
    private openCancelVisit: MatDialogRef<AnulujWizyteComponent>,
    private router: Router,
    private fb: FormBuilder,
    private db: DbCommunicationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Visit) { }

  public form: FormGroup;

  public cancelVisitAbort() {
    this.openCancelVisit.close({ reason: 'cancel' });
    this.openSnackBar('Anulowano', 'Ok');
  }


  public onSubmit(value: IVisitCancel): void {
    if (!this.form.valid) { return; }

    this.db.VisitCancel(this.data.id, value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });

  }

  private buildForm(): void {
    this.form = this.fb.group({
      Reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('Data: ', this.data);
    this.buildForm();
  }


  private handleResponse(): void {
    this.openSnackBar(`Wizyta nr ${this.data.id} została anulowana`, 'Ok');
    this.openCancelVisit.close({ reason: 'Cancelled' });
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
    console.warn(err);
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
