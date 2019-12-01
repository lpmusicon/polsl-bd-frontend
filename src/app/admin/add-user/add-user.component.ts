import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/Form/IUserRegister';
import { UserRoleDTO } from 'src/app/DTO/UserRoleDTO';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    private openAddUserDialogRef: MatDialogRef<AddUserComponent>, 
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar
    ) { }

  public addUserDialogCancel() {
    this.openAddUserDialogRef.close({ reason: "cancel" });
    this.openSnackBar("Anulowano", "Ok");
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Login: ['', Validators.required],
      Name: ['', Validators.required],
      LastName: ['', Validators.required],
      Role: ['', Validators.required],
      Password: ['', Validators.required],
      PWZNumber: ['']
    });
  }
  
  public onSubmit(iUserRegister: IUserRegister): void {
    if (!this.form.valid) return;
    
    this._db.UserRegister(iUserRegister).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  private handleResponse(): void {
    this.openSnackBar("Dodano użytkownika " + this.form.get("Login").value, "Ok");
    this.openAddUserDialogRef.close({ reason: "added" });
  }

  private handleError(err: HttpErrorResponse)
  {
    console.warn(err);
  }

  Roles: UserRoleDTO[] = [
    { Mnemo: 'ADMN', Name: 'Administrator' },
    { Mnemo: 'DOCT', Name: 'Lekarz' },
    { Mnemo: 'RECP', Name: 'Recepcjonista' },
    { Mnemo: 'LABW', Name: 'Pracownik Laboratorium' },
    { Mnemo: 'LABM', Name: 'Kierownik Laboratorium' }
  ];
}

