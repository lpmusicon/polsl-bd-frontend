import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { BadanieFizykalneComponent } from '../badanie-fizykalne/badanie-fizykalne.component';
import { BadanieLaboratoryjneComponent } from '../badanie-laboratoryjne/badanie-laboratoryjne.component';



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

  private data;

  private handleParams(a){
    console.log(a.id);
    this.data = a.id;
  }
  
  ngOnInit() {
    this.route.params.subscribe({
      next: this.handleParams.bind(this)
    });
  }

  

}
