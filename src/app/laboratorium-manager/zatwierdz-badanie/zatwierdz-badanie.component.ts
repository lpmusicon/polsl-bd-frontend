import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-zatwierdz-badanie',
  templateUrl: './zatwierdz-badanie.component.html',
  styleUrls: ['./zatwierdz-badanie.component.scss']
})
export class ZatwierdzBadanieComponent implements OnInit {

  constructor(private openCommitLabExamination: MatDialogRef<ZatwierdzBadanieComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelCommitLabExamination() {
    this.openCommitLabExamination.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openCommitLabExamination.close({ reason: "save" });
    this.openSnackBar("Powierdzono wykonanie badania nr "+ this.data.LabExamination.id, "Ok");
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
