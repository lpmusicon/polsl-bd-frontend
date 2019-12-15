import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DbCommunicationService } from 'src/app/db-communication.service';
import { VisitDTO } from 'src/app/DTO/VisitDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDTO } from 'src/app/DTO/UserDto';

interface Visit extends VisitDTO {
  actions: any;
}

@Component({
  selector: 'app-lista-wizyt',
  templateUrl: './lista-wizyt.component.html',
  styleUrls: ['./lista-wizyt.component.scss']
})
export class ListaWizytComponent implements OnInit {

  constructor(
    private _router: Router,
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private _db: DbCommunicationService) { 
    this.route.queryParams.subscribe(params => {
      if(params["visit"]) {
        console.log("Visit: ", params["visit"]);
      }
      console.log("Par: ", params);
    })
  }

  public Visits: Visit[];
  public user: UserDTO;

  public logout(): void {
    this._db.logout();
    this._router.navigate(["/"]);
  }

  displayedColumns: string[] = ['position', 'pat_name', 'doc_name', 'date', 'actions'];
  dataSource = new MatTableDataSource(this.Visits);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openStartVisitDialog(data: Visit): void {
    this._router.navigate(["/lekarz/wizyta/" + data.patientVisitId]);
  }

  private loadData() {
    this._db.VisitRegisteredAll().subscribe({
      next: this.handleData.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handleData(data: VisitDTO[]) {
    console.log(data);
    this.Visits = [];
    for(const visit of data) {
      this.Visits.push({
        ...visit,
        actions: ''
      });
    }
    this.dataSource = new MatTableDataSource(this.Visits);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private handleError(err: HttpErrorResponse) {
    console.warn(err);
  }




  ngOnInit() {
    this.loadData();
    this.user = this._db.getUser();
  }

}
