import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { LaboratoryExaminationOrderedDTO } from 'src/app/DTO/LaboratoryExaminationOrderedDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { LaboratoryExaminationGenericDTO } from 'src/app/DTO/LaboratoryExaminationGenericDTO';

@Component({
  selector: 'app-lista-badan',
  templateUrl: './lista-badan.component.html',
  styleUrls: ['./lista-badan.component.scss']
})
export class ListaBadanComponent implements OnInit {
  public pastExaminations: LaboratoryExaminationGenericDTO[] = [];

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private _db: DbCommunicationService,
    private router: Router) {
  }

  public LabExaminations: LaboratoryExaminationOrderedDTO[] = [];

  public logout(): void {
    this._db.logout();
    this.router.navigate(['/']);
  }

  displayedColumns: string[] = ['id', 'doctorComment', 'orderDate', 'laboratoryExaminationName', 'actions'];
  dataSource = new MatTableDataSource(this.LabExaminations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private handleDataDone(data: LaboratoryExaminationGenericDTO[])
  {
    this.pastExaminations = data.map((lab: LaboratoryExaminationGenericDTO) => {
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
        case 'Executed':
          lab.status = "Wykonane";
          break;
          default: break;
      }
      return lab;
    });
  }

  private handleResponse(data: LaboratoryExaminationOrderedDTO[]) {
    console.log(data);
    this.dataSource.data = data;
  }

  private handleError(err: HttpErrorResponse) {
    console.warn(err);
  }

  loadData() {
    this._db.LaboratoryExaminationOrdered().subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });

    this._db.LaboratoryExaminationDone().subscribe({
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
