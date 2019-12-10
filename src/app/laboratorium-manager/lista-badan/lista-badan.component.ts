import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LaboratoryExaminationExecutedDTO } from 'src/app/DTO/LaboratoryExaminationExecutedDTO';



@Component({
  selector: 'app-lista-badan',
  templateUrl: './lista-badan.component.html',
  styleUrls: ['./lista-badan.component.scss']
})
export class ListaBadanComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private _db: DbCommunicationService,
    private router: Router
    ) {}

  public KLabExaminations: LaboratoryExaminationExecutedDTO[] = [];

  public logout(): void {
    this._db.logout();
    this.router.navigate(['/']);
  }

  displayedColumns: string[] = ['id', 'doctorComment', 'orderDate', 'examinationName', 'worker', 'result', 'examinationDate', 'actions'];
  dataSource = new MatTableDataSource(this.KLabExaminations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private handleData(data: LaboratoryExaminationExecutedDTO[])
  {
    console.log(data);
    this.dataSource.data = data;
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
    this._db.LaboratoryExaminationPending().subscribe({
      next: this.handleData.bind(this),
      error: this.handleError.bind(this)
    })
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
