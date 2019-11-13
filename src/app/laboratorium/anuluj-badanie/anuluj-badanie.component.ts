import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-anuluj-badanie',
  templateUrl: './anuluj-badanie.component.html',
  styleUrls: ['./anuluj-badanie.component.scss']
})
export class AnulujBadanieComponent implements OnInit {

  constructor(private openResetPasswordDialogRef: MatDialogRef<AnulujBadanieComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
