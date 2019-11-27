import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { BadanieFizykalneComponent } from '../badanie-fizykalne/badanie-fizykalne.component';
import { BadanieLaboratoryjneComponent } from '../badanie-laboratoryjne/badanie-laboratoryjne.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-wizyta',
  templateUrl: './wizyta.component.html',
  styleUrls: ['./wizyta.component.scss']
})
export class WizytaComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _db: DbCommunicationService,
    private _snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["badanie"]) {
        console.log("Badanie: ", params["badanie"]);
      }
      console.log("Par: ", params);
    })
  }

  openAddExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieFizykalneComponent, {
      width: '650px',
      data: { patId: this.data }
    });

    openAddExamintionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddLabExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieLaboratoryjneComponent, {
      width: '650px',
      data: { patId: this.data }
    });

    openAddExamintionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private data;

  private handleParams(a) {
    console.log(a.id);
    this.data = a.id;
  }

  public form: FormGroup;

  private buildForm(): void {
    this.form = this._fb.group({
      Description: ['', Validators.required],
      Diagnosis: ['', Validators.required]
    });
  }

  //TODO replace any
  public onSubmit(value: any): void {
    if (!this.form.valid) return;
    //TODO db

  }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe({
      next: this.handleParams.bind(this)
    });
  }
  //TODO replace any
  private handleResponse(auth: any): void {

    this.openSnackBar("Wizyta pacjenta " + "TODO" + " została zakończona", "Ok");
    window.setTimeout(() => {

      this._router.navigate(["/lekarz"]);
    }, 1000);
  }

  private handleAuthError(err: HttpErrorResponse): void {
    switch (err.status) {
      case 404:
        this.openSnackBar("Nie znaleziono wizyty", "Ok");
        break;
      case 400:
        //Złe dane
        this.openSnackBar("Niepoprawne dane/brak danych", "Ok");
        console.warn("Wrong/empty data");
        break;
      default:
        //Nieokreślony błąd
        this.openSnackBar("Wystąpił nieokreślony błąd", "Ok");
        console.warn("Generic error");
        break;
    }
    console.warn(err);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
