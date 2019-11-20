import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-anuluj-badanie',
  templateUrl: './anuluj-badanie.component.html',
  styleUrls: ['./anuluj-badanie.component.scss']
})
export class AnulujBadanieComponent implements OnInit {

  constructor(
    private openCancelLabExamination: MatDialogRef<AnulujBadanieComponent>, 
    private _snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelLabExaminationAbort() {
    this.openCancelLabExamination.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openCancelLabExamination.close({ reason: "save" });
    this.openSnackBar("Badanie "+ this.data.LabExamination.id +" zostało anulowane", "Ok");
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
