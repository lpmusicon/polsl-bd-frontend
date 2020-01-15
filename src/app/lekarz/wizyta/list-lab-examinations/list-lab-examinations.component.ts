import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LaboratoryExaminationOrderedVisitDTO } from 'src/app/DTO/LaboratoryExaminationOrderedVisitDTO';
import { PatientLaboratoryExaminationDTO } from 'src/app/DTO/PatientLaboratoryExaminationDTO';

@Component({
  selector: 'app-list-lab-examinations',
  templateUrl: './list-lab-examinations.component.html',
  styleUrls: ['./list-lab-examinations.component.scss']
})
export class ListLabExaminationsComponent implements OnInit, OnChanges {
  @Input() public labExaminations: PatientLaboratoryExaminationDTO[];
  public labExaminationsDisplayedColumns: string[] = ['examinationName', 'result', 'doctorName', 'doctorLastName' , 'orderExaminationDate', 'executeExaminationDate'];
  public examinations = new MatTableDataSource(this.labExaminations);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.examinations.paginator = this.paginator;
    this.examinations.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.labExaminations.currentValue !== undefined) {
      this.examinations.data = changes.labExaminations.currentValue;
    }
  }

  applyFilter(filterValue: string) {
    this.examinations.filter = filterValue.trim().toLowerCase();
  }
}
