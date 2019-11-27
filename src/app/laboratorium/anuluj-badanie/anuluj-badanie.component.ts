import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILaboratoryExaminationAbort } from 'src/app/Form/ILaboratoryExaminationAbort';

@Component({
  selector: 'app-anuluj-badanie',
  templateUrl: './anuluj-badanie.component.html',
  styleUrls: ['./anuluj-badanie.component.scss']
})
export class AnulujBadanieComponent implements OnInit {

  constructor(
    private openCancelLabExamination: MatDialogRef<AnulujBadanieComponent>,
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelLabExaminationAbort() {
    this.openCancelLabExamination.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  //TODO replace any
  public onSubmit(iLaboratoryExamination: ILaboratoryExaminationAbort): void {
    if (!this.form.valid) return;
    
    this._db.LaboratoryExaminationAbort(this.data.LabExamination.id, iLaboratoryExamination).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Reason: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  private handleResponse(): void {
    this.openSnackBar(`Badanie nr ${this.data.LabExamination.id} zostało anulowane`, "Ok");
  }

  private handleError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 404:
        this.openSnackBar("Nie znaleziono badania", "Ok");
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
