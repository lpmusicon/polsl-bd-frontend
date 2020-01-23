import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { GenericVisitDTO } from 'src/app/DTO/GenericVisitDTO';

export interface Visit {
  id: number;
  docName: string;
  desc: string;
  diagnose: string;
  date: any;
}

@Component({
  selector: 'app-past-visits',
  templateUrl: './past-visits.component.html',
  styleUrls: ['./past-visits.component.scss']
})
export class PastVisitsComponent implements OnInit, OnChanges {

  constructor() { }

  @Input("visits") visits: GenericVisitDTO[];

  displayedColumns: string[] = ['patientVisitId', 'status', 'registerDate', 'closeDate', 'patient', 'description', 'diagnosis'];
  dataSource = new MatTableDataSource(this.visits);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.visits.currentValue !== undefined) {
      console.log('Visit changes:', changes);
      this.dataSource.data = changes.visits.currentValue;
    }
  }

}
