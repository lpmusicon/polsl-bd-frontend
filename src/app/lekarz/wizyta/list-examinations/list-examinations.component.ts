import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LaboratoryExaminationOrderedVisitDTO } from 'src/app/DTO/LaboratoryExaminationOrderedVisitDTO';
import { PhysicalExaminationDTO } from 'src/app/DTO/PhysicalExaminationDTO';
import { PatientPhysicalExaminationDTO } from 'src/app/DTO/PatientPhysicalExaminationDTO';

@Component({
  selector: 'app-list-examinations',
  templateUrl: './list-examinations.component.html',
  styleUrls: ['./list-examinations.component.scss']
})
export class ListExaminationsComponent implements OnInit, OnChanges {
  @Input() public examinations: PatientPhysicalExaminationDTO[];
  public examinationsDisplayedColumns: string[] = ['examinationName', 'result', 'doctorName', 'doctorLastName'];
  public dataExaminations = new MatTableDataSource(this.examinations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.dataExaminations.paginator = this.paginator;
    this.dataExaminations.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.examinations.currentValue !== undefined) {
      this.dataExaminations.data = changes.examinations.currentValue;
    }
  }

  applyFilter(filterValue: string) {
    this.dataExaminations.filter = filterValue.trim().toLowerCase();
  }

}
