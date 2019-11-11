import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

export interface userType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private openAddUserDialogRef: MatDialogRef<AddUserComponent>) { }

  public addUserDialogCancel() {
    this.openAddUserDialogRef.close();
  }

  ngOnInit() {
  }

  userTypes: userType[] = [
    { value: 'admin-0', viewValue: 'Admin' },
    { value: 'lekarz-1', viewValue: 'Lekarz' },
    { value: 'recepcja-2', viewValue: 'Recepcja' },
    { value: 'lab-3', viewValue: 'Laborant' },
    { value: 'lab_kier-4', viewValue: 'Kierownik Laboratorium' }
  ];
}

