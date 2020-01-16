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
import { PatientPhysicalExaminationDTO } from 'src/app/DTO/PatientPhysicalExaminationDTO';
import { PatientLaboratoryExaminationDTO } from 'src/app/DTO/PatientLaboratoryExaminationDTO';
import { PatientClosedVisitDTO } from 'src/app/DTO/PatientClosedVisitDTO';


@Component({
  selector: 'app-wizyta',
  templateUrl: './wizyta.component.html',
  styleUrls: ['./wizyta.component.scss']
})
export class WizytaComponent implements OnInit {
  public visit: PatientVisitDTO;
  public visitId: number;
  public form: FormGroup;
  public labExaminations: PatientLaboratoryExaminationDTO[];
  public examinations: PatientPhysicalExaminationDTO[];
  public visits: PatientClosedVisitDTO[];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private db: DbCommunicationService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
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

  public logout(): void {
    this.db.logout();
    this.router.navigate(['/']);
  }

  openAddExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieFizykalneComponent, {
      width: '650px',
      data: { VisitId: this.visitId,
        PatientName: this.visit.patient.name,
        PatientLastname: this.visit.patient.lastname}
    });

    openAddExamintionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchPhysicalExaminations();
    });
  }

  private fetchPhysicalExaminations() {
    this.db.PatientPhysicalExaminations(this.visit.patient.patientId).subscribe({
      next: this.handlePhysicalExaminations.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handlePhysicalExaminations(data: PatientPhysicalExaminationDTO[]) {
    this.examinations = data;
  }

  openAddLabExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieLaboratoryjneComponent, {
      width: '650px',
      data: { 
        VisitId: this.visitId,
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
    this.db.PatientLaboratoryExaminations(this.visit.patient.patientId).subscribe({
      next: this.handleLabExaminations.bind(this)
    });
  }

  private handleLabExaminations(labExaminations: PatientLaboratoryExaminationDTO[]) {
    this.labExaminations = labExaminations;
  }

  private handleParams(a: any) {
    console.log(a);
    this.visitId = a.id;
    this.db.Visit(this.visitId).subscribe({
      next: this.handleData.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handleData(visit: PatientVisitDTO) {
    this.visit = visit;
    this.fetchPhysicalExaminations();
    this.fetchLabExaminations();
    this.fetchPreviousVisits();
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

  private handleResponse(auth: any): void {
    this.openSnackBar(`Wizyta pacjenta ${this.visit.patient.name} ${this.visit.patient.lastname} została zakończona`, 'Ok');

    this.router.navigate(['/lekarz']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private fetchPreviousVisits() {
    this.db.PatientVisits(this.visit.patient.patientId).subscribe({
      next: this.handlePreviousVisits.bind(this)
    });
  }

  private handlePreviousVisits(data: PatientClosedVisitDTO[]) {
    this.visits = data;
    console.log(data);
  }

}
