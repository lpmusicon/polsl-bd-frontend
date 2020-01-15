import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DictionaryDTO } from 'src/app/DTO/DictionaryDTO';
import { IExaminationPerform } from 'src/app/Form/IExaminationPerform';

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

  public onSubmit(value: IExaminationPerform): void {
    if (!this.form.valid) return;
    
    this._db.PhysicalExaminationPerform(value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      ExaminationId: ['', Validators.required],
      Result: ['', Validators.required],
      VisitId: ['']
    });

    this.form.get('VisitId').setValue(parseInt(this.data.VisitId));
  }

  private handleDictionary(dictionary: DictionaryDTO[]) {
    this.examTypes = dictionary;
  }

  private fetchDictionary() {
    this._db.PhysicalExaminationDictionary().subscribe({
      next: this.handleDictionary.bind(this),
      error: this.handleError.bind(this)
    })
  }

  ngOnInit() {
    this.fetchDictionary();
    this.buildForm();
  }

  private handleResponse(auth: any): void {
    this.openSnackBar("Badanie fizykalne zostało wykonane", "Ok");
    this.openAddExaminationRef.close();
  }

  private handleError(err: HttpErrorResponse): void {
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

  examTypes: DictionaryDTO[] = [];
}
