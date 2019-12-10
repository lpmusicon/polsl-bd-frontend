import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AnulujBadanieComponent } from '../../anuluj-badanie/anuluj-badanie.component';
import { ZatwierdzBadanieComponent } from '../../zatwierdz-badanie/zatwierdz-badanie.component'

@Component({
  selector: 'app-list-item-manage',
  templateUrl: './list-item-manage.component.html',
  styleUrls: ['./list-item-manage.component.scss']
})
export class ListItemManageComponent implements OnInit {

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  @Input("lab-examination") public KLabExamination: any;

  ngOnInit() {}

  openCancelLabExaminationDialog(...args): void {
    console.log("setting for: ", this.KLabExamination);
    const openCancelLabExaminationDialogRef = this.dialog.open(AnulujBadanieComponent, {
      width: '650px',
      data: { LabExamination: this.KLabExamination }
    });

    openCancelLabExaminationDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

  openCommitLabExaminationDialog(...args): void {
    console.log(args);
    console.log("setting for: ", this.KLabExamination);
    const openCommitLabExaminationDialogRef = this.dialog.open(ZatwierdzBadanieComponent, {
      width: '650px',
      data: { KLabExamination: this.KLabExamination }
    });

    openCommitLabExaminationDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
