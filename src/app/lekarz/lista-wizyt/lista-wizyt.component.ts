import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface Visit {
  id: number;
  patientName: string;
  docName: string;
  date: any;
  actions: any;
}

@Component({
  selector: 'app-lista-wizyt',
  templateUrl: './lista-wizyt.component.html',
  styleUrls: ['./lista-wizyt.component.scss']
})
export class ListaWizytComponent implements OnInit {

  constructor(private _router: Router ,public dialog: MatDialog, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if(params["visit"]) {
        console.log("Visit: ", params["visit"]);
      }
      console.log("Par: ", params);
    })
  }

  public Visits: Visit[] = [];

  displayedColumns: string[] = ['position', 'pat_name', 'doc_name', 'date', 'actions'];
  dataSource = new MatTableDataSource(this.Visits);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openStartVisitDialog(data: Visit, e: HTMLElement): void {
    this._router.navigate(["/lekarz/wizyta/"+data.id]);
  }

  ngOnInit() {
    for(let i = 0; i < 696; i++) {
      this.Visits.push({ id: i, date: '11/13/2019', patientName: "Łukaszek", docName: "Czesiek", actions:""});
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
