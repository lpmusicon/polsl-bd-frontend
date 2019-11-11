import { Component, OnInit} from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component'
import { MatDialog } from '@angular/material/dialog';
import { SetExpiryDateUserComponent } from '../set-expiry-date-user/set-expiry-date-user.component';
import { ResetPasswordUserComponent } from '../reset-password-user/reset-password-user.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openAddUserDialog(): void {
    const openAddUserDialogRef = this.dialog.open(AddUserComponent, {
      width: '650px',
    });
    {}
    openAddUserDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSetExpiryDateDialog(): void {

    const openSetExpiryDateDialogRef = this.dialog.open(SetExpiryDateUserComponent, {
      width: '650px',
    });

    openSetExpiryDateDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  openResetPasswordDialog(): void {
    const openResetPasswordDialogRef = this.dialog.open(ResetPasswordUserComponent, {
      width: '650px',
    });

    openResetPasswordDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

}
