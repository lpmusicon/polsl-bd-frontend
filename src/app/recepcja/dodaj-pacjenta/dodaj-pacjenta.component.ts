import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dodaj-pacjenta',
  templateUrl: './dodaj-pacjenta.component.html',
  styleUrls: ['./dodaj-pacjenta.component.scss']
})
export class DodajPacjentaComponent implements OnInit {

  constructor(private openAddPatientDialogRef: MatDialogRef<DodajPacjentaComponent>, private _snackBar: MatSnackBar) { }

  public addPatientDialogCancel() {
    this.openAddPatientDialogRef.close({reason: "cancel"});
    this.openSnackBar("Anulowano", "Ok");
  }
  
  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openAddPatientDialogRef.close({reason: "save"});
    this.openSnackBar("Dodano nowego pacjenta", "Ok");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

}
