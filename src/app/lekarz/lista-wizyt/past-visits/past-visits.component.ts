import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PatientVisitDTO } from 'src/app/DTO/PatientVisitDTO';

@Component({
  selector: 'app-past-visits',
  templateUrl: './past-visits.component.html',
  styleUrls: ['./past-visits.component.scss']
})
export class PastVisitsComponent implements OnInit {
  @Input('visits') examinations: PatientVisitDTO[];

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.examinations.currentValue !== undefined) {
      this.dataSource.data = changes.examinations.currentValue;
    }
  }

  displayedColumns: string[] = ['patientVisitId', 'status', 'registerDate', 'closeDate', 'patient', 'description', 'diagnosis'];
  dataSource = new MatTableDataSource(this.examinations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string, dataSource: MatTableDataSource<any>) {
    dataSource.filter = filterValue.trim().toLowerCase();
  }

}
