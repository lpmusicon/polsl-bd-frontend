import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PatientVisitDTO } from 'src/app/DTO/PatientVisitDTO';

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
export class PreviousVisitsComponent implements OnInit, OnChanges {

  constructor() { }

  @Input("visits") visits: PatientVisitDTO[];

  public Visits: Visit[] = [];
  visitsDisplayedColumns: string[] = ['patientVisitId', "description", 'diagnosis', 'doctor', 'registerDate'];
  visitsDataSource = new MatTableDataSource(this.Visits);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.visitsDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.visitsDataSource.paginator = this.paginator;
    this.visitsDataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.visits.currentValue !== undefined) {
      console.log('Visit changes:', changes);
      this.visitsDataSource.data = changes.visits.currentValue;
    }
  }

}
