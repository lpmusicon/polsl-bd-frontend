import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

export interface KLabExamination {
  id: number;
  docComment: string;
  orderDate: any;
  type: string;
  madeBy: string;
  result: string;
  examDate: string;
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
      if(params["k-lab-examination"]) {
        console.log("KLabExamination: ", params["k-lab-examination"]);
      }
      console.log(params);
    })
  }

  public KLabExaminations: KLabExamination[] = [];

  displayedColumns: string[] = ['position', 'comment', 'orDate', 'type', 'worker', 'result', 'examDate', 'actions'];
  dataSource = new MatTableDataSource(this.KLabExaminations);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    for(let i = 0; i < 696; i++) {
      this.KLabExaminations.push({ id: i, docComment: `Leżę na sklocie w kontenerze z ${i}-ma Rumunami gorzała leci 10-ocio l. Bongo się kopci na psie kurwa dredy pierdolniety jamajczyk mu zrobił ?! I chuj. Jakiś chyba ?? Węgier ssie mi palca u nogi ??! Jebla idzie dostać. Trzymajcie się w tej Anglii !!!`, orderDate: '11/13/2019', type: "Badanie krwi", madeBy: "Twój Stary", result: "Dostał jebla", examDate: '11/13/2020', actions:""});
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
