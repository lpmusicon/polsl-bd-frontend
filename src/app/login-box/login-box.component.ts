import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthDTO } from '../DTO/AuthDto';
import { DbCommunicationService } from '../db-communication.service';
import { ILogin } from '../Form/ILogin';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Login: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  public onSubmit(value: ILogin): void {
    if (!this.form.valid) return;

    this._db.authenticate(value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleAuthError.bind(this)
    });
  }

  private openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private handleResponse(auth: AuthDTO): void {
    console.log("Token: ", auth.token);
    console.log("Role: ", auth.role);
    console.log("userID", auth.userId);
    console.log("disabledTo", auth.expiryDate);

    this.openSnackBar("Logowanie", "");
    window.setTimeout(() => {

      switch (auth.role) {
        case 'ADMN':
          this._router.navigate(["/admin"]);
          break;
        case 'DOCT':
          this._router.navigate(["/lekarz"]);
          break;
        case 'RECP':
          this._router.navigate(['/recepcja']);
          break;
        case 'LABW':
        case 'LABM':
          this._router.navigate(['/lab']);
          break;
        default:
          this.openSnackBar("Wystąpił nieokreślony błąd", "Ok");
          break;
      }
    }, 1000);
  }

  private handleAuthError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 400:
        //Złe dane użytkownika
        this.openSnackBar("Nieprawidłowy użytkownik lub hasło", "Ok");
        console.warn("Invalid user/password");
        break;
      default:
        //Nieokreślony błąd
        this.openSnackBar("Wystąpił nieokreślony błąd", "Ok");
        console.warn("Generic error");
        break;
    }
    console.warn(err);
  }
}
