import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export interface examType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-badanie-fizykalne',
  templateUrl: './badanie-fizykalne.component.html',
  styleUrls: ['./badanie-fizykalne.component.scss']
})
export class BadanieFizykalneComponent implements OnInit {

  constructor(
    private openAddExaminationRef: MatDialogRef<BadanieFizykalneComponent>,
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelAddExamination() {
    this.openAddExaminationRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit(value: any): void {
    if (!this.form.valid) return;
    //TODO db

  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      ExamType: ['', Validators.required],
      Result: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  private handleResponse(auth: any): void {

    this.openSnackBar("Badanie fizykalne zostało wykonane", "Ok");
    window.setTimeout(() => {

      this._router.navigate(["/TODO"]);
    }, 1000);
  }

  private handleAuthError(err: HttpErrorResponse): void {
    switch (err.status) {
	case 404:
        this.openSnackBar("Nie znaleziono pacjenta", "Ok");
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

  examTypes: examType[] = [
    { value: 'admin-0', viewValue: 'Admin' },
    { value: 'lekarz-1', viewValue: 'Lekarz' },
    { value: 'recepcja-2', viewValue: 'Recepcja' },
    { value: 'lab-3', viewValue: 'Laborant' },
    { value: 'lab_kier-4', viewValue: 'Kierownik Laboratorium' }
  ];

}
