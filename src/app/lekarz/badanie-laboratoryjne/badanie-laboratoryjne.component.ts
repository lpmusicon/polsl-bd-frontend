import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

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
    private _snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelAddLabExamination() {
    this.openAddLabExaminationRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openAddLabExaminationRef.close({ reason: "save" });
    this.openSnackBar("Badanie zostało zlecone", "Ok");
  }

  ngOnInit() {
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
