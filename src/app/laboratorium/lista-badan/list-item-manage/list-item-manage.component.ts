import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AnulujBadanieComponent } from '../../anuluj-badanie/anuluj-badanie.component';
import { WykonajBadanieComponent } from '../../wykonaj-badanie/wykonaj-badanie.component'

@Component({
  selector: 'app-list-item-manage',
  templateUrl: './list-item-manage.component.html',
  styleUrls: ['./list-item-manage.component.scss']
})
export class ListItemManageComponent implements OnInit {

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  @Input("lab-examination") public LabExamination: any;

  ngOnInit() {}

  openCancelLabExaminationDialog(...args): void {
    console.log("setting for: ", this.LabExamination);
    const openSetExpiryDateDialogRef = this.dialog.open(AnulujBadanieComponent, {
      width: '650px',
      data: { LabExamination: this.LabExamination }
    });

    openSetExpiryDateDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

  openMakeLabExaminationDialog(...args): void {
    console.log(args);
    console.log("setting for: ", this.LabExamination);
    const openResetPasswordDialogRef = this.dialog.open(WykonajBadanieComponent, {
      width: '650px',
      data: { LabExamination: this.LabExamination }
    });

    openResetPasswordDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
