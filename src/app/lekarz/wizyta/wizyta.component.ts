import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { BadanieFizykalneComponent } from '../badanie-fizykalne/badanie-fizykalne.component';
import { BadanieLaboratoryjneComponent } from '../badanie-laboratoryjne/badanie-laboratoryjne.component';

export interface Visit {
  id: number;
  docName: string;
  desc: string;
  diagnose: string;
  date: any;
}

export interface LabExamination {
  id: number;
  docName: string;
  workerName: any;
  type: string;
  result: string;
  date: any;
}

export interface Examination {
  id: number;
  docName: string;
  type: string;
  result: string;
  date: any;
}

@Component({
  selector: 'app-wizyta',
  templateUrl: './wizyta.component.html',
  styleUrls: ['./wizyta.component.scss']
})
export class WizytaComponent implements OnInit {


  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    if(params["badanie"]) {
      console.log("Badanie: ", params["badanie"]);
    }
    console.log("Par: ", params);
  }) }

  openAddExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieFizykalneComponent, {
      width: '650px',
      data: { patId:  this.data}
    });

    openAddExamintionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAddLabExaminationDialog(): void {
    const openAddExamintionDialogRef = this.dialog.open(BadanieLaboratoryjneComponent, {
      width: '650px',
      data: { patId:  this.data}
    });

    openAddExamintionDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public Visits: Visit[] = [];
  public LabExaminations: LabExamination[] = [];
  public Examinations: Examination[] = [];

  visitsDisplayedColumns: string[] = ['position', 'doc_name', "description", 'diagnose', 'date'];
  labExaminationsDisplayedColumns: string[] = ['position', 'doc_name', 'worker_name', 'type' , 'result', 'date'];
  examinationsDisplayedColumns: string[] = ['position', 'doc_name', 'type', 'result', 'date'];
  visits = new MatTableDataSource(this.Visits);
  labExaminations = new MatTableDataSource(this.LabExaminations);
  examinations = new MatTableDataSource(this.Examinations);


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  applyFilter(filterValue: string) {
    this.visits.filter = filterValue.trim().toLowerCase();
    this.labExaminations.filter = filterValue.trim().toLowerCase();
    this.examinations.filter = filterValue.trim().toLowerCase();
  }

  private data;

  private handleParams(a){
    console.log(a.id);
    this.data = a.id;
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: this.handleParams.bind(this)
    });
    for(let i = 0; i < 696; i++) {
      this.Visits.push({ id: i, desc: "Potrzebna decyzja czy pracownik laboratorium może widzieć wykonane badania innego pracownika", diagnose: "rak", date: '11/13/2019', docName: "Czesiek"});
    }
    for(let i = 0; i < 2; i++) {
      this.LabExaminations.push({ id: i, docName: "Czesiek", workerName: "Macin", type: "Badanie wkurwa", result: "Oh yes" , date: '21/37/2019', });
    }
    for(let i = 0; i < 3; i++) {
      this.Examinations.push({ id: i, docName: "Macin", type: "Badanie dupy", result: "OH YES" , date: '13/37/2019', });
    }

    this.visits.paginator = this.paginator;
    this.visits.sort = this.sort;
    this.labExaminations.paginator = this.paginator;
    this.labExaminations.sort = this.sort;
    this.examinations.paginator = this.paginator;
    this.examinations.sort = this.sort;
  }

  

}
