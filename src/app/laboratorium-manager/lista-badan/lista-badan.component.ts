import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LaboratoryExaminationExecutedDTO } from 'src/app/DTO/LaboratoryExaminationExecutedDTO';
import { LaboratoryExaminationGenericDTO } from 'src/app/DTO/LaboratoryExaminationGenericDTO';

@Component({
  selector: 'app-lista-badan',
  templateUrl: './lista-badan.component.html',
  styleUrls: ['./lista-badan.component.scss']
})
export class ListaBadanComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private db: DbCommunicationService,
    private router: Router
    ) {}

  public KLabExaminations: LaboratoryExaminationExecutedDTO[] = [];

  public doneLabExaminations: LaboratoryExaminationGenericDTO[] = [];

  public logout(): void {
    this.db.logout();
    this.router.navigate(['/']);
  }

  displayedColumns: string[] = ['id', 'doctorComment', 'orderDate', 'examinationName', 'worker', 'result', 'examinationDate', 'actions'];
  dataSource = new MatTableDataSource(this.KLabExaminations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string, dataSource: MatTableDataSource<any>) {
    dataSource.filter = filterValue.trim().toLowerCase();
  }

  private handleData(data: LaboratoryExaminationExecutedDTO[])
  {
    console.log(data);
    this.dataSource.data = data;
  }

  private handleDataDone(data: LaboratoryExaminationGenericDTO[])
  {
    console.log(data);
    this.doneLabExaminations = data.map((lab: LaboratoryExaminationGenericDTO) => {
      switch(lab.status) {
        case 'Approval':
          lab.status = "Zatwierdzone";
          break;
        case 'Rejected':
          lab.status = "Odrzucone";
          break;
        case 'Canceled':
          lab.status = "Anulowane";
          break;
          default: break;
      }
      return lab;
    });
  }
  
  private handleError(err: HttpErrorResponse): void {
    switch (err.status) {
      default:
        //Nieokreślony błąd
        console.warn("Generic error");
        break;
    }
    console.warn(err);
  }

  loadData() {
    this.db.LaboratoryExaminationPending().subscribe({
      next: this.handleData.bind(this),
      error: this.handleError.bind(this)
    });

    this.db.LaboratoryExaminationAllDone().subscribe({
      next: this.handleDataDone.bind(this),
      error: this.handleError.bind(this)
    });
  }

  onChange() {
    this.loadData();
  }

  ngOnInit() {
    this.loadData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
