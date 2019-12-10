import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DictionaryDTO } from 'src/app/DTO/DictionaryDTO';
import { ILaboratoryExamination } from 'src/app/Form/ILaboratoryExamination';

interface ModelData {
  VisitId: string;
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
    @Inject(MAT_DIALOG_DATA) public data: ModelData) { }

  public cancelAddLabExamination() {
    this.openAddLabExaminationRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit(value: ILaboratoryExamination): void {
    if (!this.form.valid) return;
    
    this._db.LaboratoryExaminationOrder(value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      ExaminationTypeId: ['', Validators.required],
      DoctorComment: ['', Validators.required],
      VisitId: [parseInt(this.data.VisitId)] 
    });
  }

  ngOnInit() {
    this.buildForm();
    this.fetchDictionary();
  }

  private fetchDictionary() {
    this._db.LaboratoryExaminationDictionary().subscribe({
      next: this.handleDictionary.bind(this),
      error: this.handleError.bind(this)
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private handleDictionary(dictionary: DictionaryDTO[]) {
    this.examTypes = dictionary;
  }

  //TODO replace any
  private handleResponse(): void {
    this.openSnackBar("Badanie laboratoryjne zostało zlecone", "Ok");
    this.openAddLabExaminationRef.close({ reason: "added" });
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

  examTypes: DictionaryDTO[] = [];

}
