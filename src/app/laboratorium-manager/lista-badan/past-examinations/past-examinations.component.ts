import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { LaboratoryExaminationGenericDTO } from 'src/app/DTO/LaboratoryExaminationGenericDTO';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-examinations',
  templateUrl: './past-examinations.component.html',
  styleUrls: ['./past-examinations.component.scss']
})
export class PastExaminationsComponent implements OnInit {
  @Input('examinations') examinations: LaboratoryExaminationGenericDTO[];

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

  displayedColumns: string[] = ['id', 'status', 'orderDate', 'examinationDate', 'laboratoryExaminationName', 'doctorComment', 'result'];
  dataSource = new MatTableDataSource(this.examinations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string, dataSource: MatTableDataSource<any>) {
    dataSource.filter = filterValue.trim().toLowerCase();
  }

}
