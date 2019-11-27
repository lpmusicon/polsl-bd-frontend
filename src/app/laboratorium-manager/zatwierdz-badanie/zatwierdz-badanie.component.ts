import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LaboratoryExaminationExecutedDTO } from 'src/app/DTO/LaboratoryExaminationExecutedDTO';
import { ILaboratoryExaminationApprove } from 'src/app/Form/ILaboratoryExaminationApprove';

@Component({
  selector: 'app-zatwierdz-badanie',
  templateUrl: './zatwierdz-badanie.component.html',
  styleUrls: ['./zatwierdz-badanie.component.scss']
})
export class ZatwierdzBadanieComponent implements OnInit {

  constructor(
    private openCommitLabExamination: MatDialogRef<ZatwierdzBadanieComponent>, 
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelCommitLabExamination() {
    this.openCommitLabExamination.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit(value: ILaboratoryExaminationApprove): void {
    if (!this.form.valid) return;
    this._db.LaboratoryExaminationApprove(this.data.LabExamination.id, value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    })
    
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({

    });
  }

  ngOnInit() {
    this.buildForm();
  }

  private handleResponse(): void {

    this.openSnackBar("Zatwierdzono badanie nr " + this.data.LabExamination.id, "Ok");
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
