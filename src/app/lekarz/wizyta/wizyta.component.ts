import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { BadanieFizykalneComponent } from '../badanie-fizykalne/badanie-fizykalne.component';
import { BadanieLaboratoryjneComponent } from '../badanie-laboratoryjne/badanie-laboratoryjne.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCommunicationService } from '../../db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VisitDTO } from 'src/app/DTO/VisitDTO';
import { PatientVisitDTO } from 'src/app/DTO/PatientVisitDTO';
import { IVisitClose } from 'src/app/Form/IVisitClose';
import { LaboratoryExaminationOrderedVisitDTO } from 'src/app/DTO/LaboratoryExaminationOrderedVisitDTO';
import { PhysicalExaminationDTO } from 'src/app/DTO/PhysicalExaminationDTO';


@Component({
  selector: 'app-wizyta',
  templateUrl: './wizyta.component.html',
  styleUrls: ['./wizyta.component.scss']
})
export class WizytaComponent implements OnInit {
  public visit: PatientVisitDTO;
  public visitId: number;
  public form: FormGroup;
  public labExaminations: LaboratoryExaminationOrderedVisitDTO[];
  public examinations: PhysicalExaminationDTO[];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private db: DbCommunicationService,
    private snackBar: MatSnackBar
  ) {}

  openAddExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieFizykalneComponent, {
      width: '650px',
      data: { VisitId: this.visitId,
        PatientName: this.visit.patient.name,
        PatientLastname: this.visit.patient.lastname}
    });

    openAddExamintionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddLabExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieLaboratoryjneComponent, {
      width: '650px',
      data: { VisitId: this.visitId,
        PatientName: this.visit.patient.name,
        PatientLastname: this.visit.patient.lastname
      }
    });


    openAddExamintionDialogRef.afterClosed().subscribe({
      next: () => {
        this.fetchLabExaminations();
      }
    });
  }

  private fetchLabExaminations() {
    this.db.LaboratoryExaminationOrderedVisit(this.visitId).subscribe({
      next: this.handleLabExaminations.bind(this)
    });
  }

  private handleLabExaminations(labExaminations: LaboratoryExaminationOrderedVisitDTO[]) {
    this.labExaminations = labExaminations;
  }

  public logout(): void {
    this.db.logout();
    this.router.navigate(['/']);
  }

  private handleParams(a) {
    console.log(a);
    this.visitId = a.id;
    this.db.Visit(this.visitId).subscribe({
      next: this.handleData.bind(this),
      error: this.handleError.bind(this)
    });
    this.fetchLabExaminations();
  }

  private handleData(visit: PatientVisitDTO) {
    console.log(visit);
    this.visit = visit;
  }

  private handleError(err: HttpErrorResponse) {
    console.warn(err);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      Description: ['', Validators.required],
      Diagnosis: ['', Validators.required]
    });
  }


  public onSubmit(value: IVisitClose): void {
    if (!this.form.valid) { return; }
    console.log(value);

    this.db.VisitClose(this.visitId, value).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  ngOnInit() {
    this.visit = {
      patientVisitId: this.visitId,
      patient: {
        name: '',
        lastname: '',
        patientId: 0,
        pesel: ''
      },
      registerDate: new Date()
    };

    this.buildForm();
    this.route.params.subscribe({
      next: this.handleParams.bind(this)
    });
  }

  private handleResponse(auth: any): void {
    this.openSnackBar(`Wizyta pacjenta ${this.visit.patient.name} ${this.visit.patient.lastname} została zakończona`, 'Ok');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
