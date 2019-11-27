import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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
export class ListLabExaminationsComponent implements OnInit {

  constructor() { }

  @Input("patient") pat: any;

  public LabExaminations: LabExamination[] = [];
  labExaminationsDisplayedColumns: string[] = ['position', 'doc_name', 'worker_name', 'type' , 'result', 'date'];
  labExaminations = new MatTableDataSource(this.LabExaminations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.labExaminations.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    for(let i = 0; i < 2; i++) {
      this.LabExaminations.push({ id: i, docName: "Czesiek", workerName: "Macin", type: "Badanie wkurwa", result: "Oh yes" , date: '21/37/2019', });
    }
    this.labExaminations.paginator = this.paginator;
    this.labExaminations.sort = this.sort;
  }

}
