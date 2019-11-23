import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AnulujWizyteComponent } from '../anuluj-wizyte/anuluj-wizyte.component';
import { DodajPacjentaComponent } from '../dodaj-pacjenta/dodaj-pacjenta.component';


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

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if(params["visit"]) {
        console.log("Visit: ", params["visit"]);
      }
      console.log("Par: ", params);
    }) 
  }

  

  @Input("element") public visit: any;

  public Visits: Visit[] = [];

  displayedColumns: string[] = ['position', 'pat_name', 'doc_name', 'date', 'actions'];
  dataSource = new MatTableDataSource(this.Visits);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    for(let i = 0; i < 696; i++) {
      this.Visits.push({ id: i, date: '11/13/2019', patientName: "Łukaszek", docName: "Czesiek", actions:""});
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCancelVisitDialog(data: Visit, e: HTMLElement): void {
    console.log("setting for: ", this.visit);
    const openCancelVisitDialogRef = this.dialog.open(AnulujWizyteComponent, {
      width: '650px',
      data: { ...data }
    });

    openCancelVisitDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

}
