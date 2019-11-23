import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-anuluj-wizyte',
  templateUrl: './anuluj-wizyte.component.html',
  styleUrls: ['./anuluj-wizyte.component.scss']
})
export class AnulujWizyteComponent implements OnInit {

  constructor(
    private openCancelVisit: MatDialogRef<AnulujWizyteComponent>, 
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public cancelVisitAbort() {
    this.openCancelVisit.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }


  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openCancelVisit.close({ reason: "save" })
    this.openSnackBar("Wizyta nr "+ this.data.id +" została anulowana", "Ok");
  }

  ngOnInit() {
    console.log("Data: ", this.data);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
