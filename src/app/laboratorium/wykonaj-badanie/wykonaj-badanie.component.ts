import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-wykonaj-badanie',
  templateUrl: './wykonaj-badanie.component.html',
  styleUrls: ['./wykonaj-badanie.component.scss']
})
export class WykonajBadanieComponent implements OnInit {

  constructor(private openMakeLabExamination: MatDialogRef<WykonajBadanieComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelMakeLabExamination() {
    this.openMakeLabExamination.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openMakeLabExamination.close({ reason: "save" });
    this.openSnackBar("Badanie "+ this.data.LabExamination.id +" zostało wykonane", "Ok");
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
