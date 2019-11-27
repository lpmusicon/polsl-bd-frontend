import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IVisitCancel } from 'src/app/Form/IVisitCancel';

@Component({
  selector: 'app-anuluj-wizyte',
  templateUrl: './anuluj-wizyte.component.html',
  styleUrls: ['./anuluj-wizyte.component.scss']
})
export class AnulujWizyteComponent implements OnInit {

  constructor(
    private openCancelVisit: MatDialogRef<AnulujWizyteComponent>, 
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelVisitAbort() {
    this.openCancelVisit.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }


public onSubmit(value: IVisitCancel): void {
  if (!this.form.valid) return;
  this._db.VisitCancel(this.data.Visit.id, value).subscribe({
    next: this.handleResponse.bind(this),
    error: this.handleError.bind(this)
  })
  
}

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("Data: ", this.data);
    this.buildForm();
  }

  
private handleResponse(): void {

  this.openSnackBar("Wizyta nr " + this.data.Visit.id + " została anulowana", "Ok");
}

private handleError(err: HttpErrorResponse): void {
  switch (err.status) {
case 404:
      this.openSnackBar("Nie znaleziono wizyty", "Ok");
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
