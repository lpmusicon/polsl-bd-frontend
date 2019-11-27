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
  selector: 'app-badanie-laboratoryjne',
  templateUrl: './badanie-laboratoryjne.component.html',
  styleUrls: ['./badanie-laboratoryjne.component.scss']
})
export class BadanieLaboratoryjneComponent implements OnInit {

  constructor(
    private openAddLabExaminationRef: MatDialogRef<BadanieLaboratoryjneComponent>, 
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelAddLabExamination() {
    this.openAddLabExaminationRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  //TODO replace any
  public onSubmit(value: any): void {
    if (!this.form.valid) return;
    //TODO db
    
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Examtype: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //TODO replace any
private handleResponse(auth: any): void {

  this.openSnackBar("Badanie laboratoryjne zostało zlecone", "Ok");
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

  examTypes: examType[] = [
    { value: 'admin-0', viewValue: 'Admin' },
    { value: 'lekarz-1', viewValue: 'Lekarz' },
    { value: 'recepcja-2', viewValue: 'Recepcja' },
    { value: 'lab-3', viewValue: 'Laborant' },
    { value: 'lab_kier-4', viewValue: 'Kierownik Laboratorium' }
  ];

}
