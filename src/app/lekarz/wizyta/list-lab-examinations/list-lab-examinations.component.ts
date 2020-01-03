import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LaboratoryExaminationOrderedVisitDTO } from 'src/app/DTO/LaboratoryExaminationOrderedVisitDTO';

export interface LabExamination {
  id: number;
  docName: string;
  workerName: any;
  type: string;
  result: string;
  date: any;
}

@Component({
  selector: 'app-list-lab-examinations',
  templateUrl: './list-lab-examinations.component.html',
  styleUrls: ['./list-lab-examinations.component.scss']
})
export class ListLabExaminationsComponent implements OnInit, OnChanges {
  @Input() public labExaminations: LaboratoryExaminationOrderedVisitDTO[];
  public LabExaminations: LabExamination[] = [];
  public labExaminationsDisplayedColumns: string[] = ['position', 'doc_name', 'worker_name', 'type' , 'result', 'date'];
  public examinations = new MatTableDataSource(this.LabExaminations);
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
