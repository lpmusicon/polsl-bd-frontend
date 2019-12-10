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
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if(params["lab-examination"]) {
        console.log("LabExamination: ", params["lab-examination"]);
      }
      console.log(params);
    })
  }

  public LabExaminations: LaboratoryExaminationOrderedDTO[] = [];

  public logout(): void {
    this._db.logout();
    this.router.navigate(['/']);
  }

  displayedColumns: string[] = ['position', 'comment', 'date', 'type', 'actions'];
  dataSource = new MatTableDataSource(this.LabExaminations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    })
  }

  ngOnInit() {

    this.loadData();
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
