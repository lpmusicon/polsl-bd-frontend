import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

export interface LabExamination {
  id: number;
  docComment: string;
  orderDate: any;
  type: string;
  actions: any;
}


@Component({
  selector: 'app-lista-badan',
  templateUrl: './lista-badan.component.html',
  styleUrls: ['./lista-badan.component.scss']
})
export class ListaBadanComponent implements OnInit {

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if(params["lab-examination"]) {
        console.log("LabExamination: ", params["lab-examination"]);
      }
      console.log(params);
    })
  }

  public LabExaminations: LabExamination[] = [];

  displayedColumns: string[] = ['position', 'comment', 'date', 'type', 'actions'];
  dataSource = new MatTableDataSource(this.LabExaminations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    for(let i = 0; i < 696; i++) {
      this.LabExaminations.push({ id: i, docComment: `Mój stary to fanatyk wędkarstwa. Pół mieszkania zajebane wędkami najgorsze. Średnio raz w miesiącu ktoś wdepnie w leżący na ziemi haczyk czy kotwicę i trzeba wyciągać w szpitalu bo mają zadziory na końcu. W swoim 22 letnim życiu już z ${i} razy byłem na takim zabiegu. Tydzień temu poszedłem na jakieś losowe badania to baba z recepcji jak mnie tylko zobaczyła to kazała buta ściągać xD bo myślała, że znowu hak w nodze.`, orderDate: '11/13/2019', type: "Badanie krwi", actions:""});
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
