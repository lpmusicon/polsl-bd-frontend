import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface Visit {
  id: number;
  docName: string;
  desc: string;
  diagnose: string;
  date: any;
}

@Component({
  selector: 'app-previous-visits',
  templateUrl: './previous-visits.component.html',
  styleUrls: ['./previous-visits.component.scss']
})
export class PreviousVisitsComponent implements OnInit {

  constructor() { }

  @Input("patient") pat: any;

  public Visits: Visit[] = [];
  visitsDisplayedColumns: string[] = ['position', 'doc_name', "description", 'diagnose', 'date'];
  visits = new MatTableDataSource(this.Visits);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.visits.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    for(let i = 0; i < 696; i++) {
      this.Visits.push({ id: i, desc: "Potrzebna decyzja czy pracownik laboratorium może widzieć wykonane badania innego pracownika", diagnose: "rak", date: '11/13/2019', docName: "Czesiek"});
    }
    this.visits.paginator = this.paginator;
    this.visits.sort = this.sort;
  }

}
