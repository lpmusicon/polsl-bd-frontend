import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SetExpiryDateUserComponent } from '../../set-expiry-date-user/set-expiry-date-user.component';
import { ResetPasswordUserComponent } from '../../reset-password-user/reset-password-user.component';

@Component({
  selector: 'app-list-item-manage',
  templateUrl: './list-item-manage.component.html',
  styleUrls: ['./list-item-manage.component.scss']
})
export class ListItemManageComponent implements OnInit {

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  @Input("user") public user: any;
  @Output("change") public changed: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {}

  openSetExpiryDateDialog(...args): void {
    console.log("setting for: ", this.user);
    const openSetExpiryDateDialogRef = this.dialog.open(SetExpiryDateUserComponent, {
      width: '650px',
      data: this.user
    });

    openSetExpiryDateDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.changed.emit();
    });

  }

  openResetPasswordDialog(...args): void {
    console.log(args);
    console.log("setting for: ", this.user);
    const openResetPasswordDialogRef = this.dialog.open(ResetPasswordUserComponent, {
      width: '650px',
      data: this.user
    });

    openResetPasswordDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.changed.emit();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
