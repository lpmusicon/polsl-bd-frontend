import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-set-expiry-date-user',
  templateUrl: './set-expiry-date-user.component.html',
  styleUrls: ['./set-expiry-date-user.component.scss']
})
export class SetExpiryDateUserComponent implements OnInit {

  constructor(private openSetExpiryDateDialogRef: MatDialogRef<SetExpiryDateUserComponent>) { }

  public setExpiryDateCancel() {
    this.openSetExpiryDateDialogRef.close();
  }

  public onSubmit() {
    console.log("Submit me babe one more time");
    this.openSetExpiryDateDialogRef.close({ reason: "save" });
  }

  ngOnInit() {
  }

}
