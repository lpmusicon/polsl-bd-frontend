import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddUserComponent } from '../add-user/add-user.component';

interface User {
  id: number;
  name: string;
  role: string;
  actions: any;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListUserComponent implements OnInit {

  public users: User[] = [];

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if(params["user"]) {
        console.log("User: ", params["user"]);
      }
      console.log(params);
    })
  }

  displayedColumns: string[] = ['position', 'name', 'role', 'actions'];
  dataSource = new MatTableDataSource(this.users);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  openAddUserDialog(): void {
    const openAddUserDialogRef = this.dialog.open(AddUserComponent, {
      width: '650px',
    });
    
    openAddUserDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    //TODO: Replace by real data
    for(let i = 0; i < 696; i++) {
      this.users.push({ id: i, name: `Name ${i}`, role: "Spadochroniarz", actions:""});
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

}
