import { Component, OnInit} from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component'
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public filterCriteria: string = "";
  public users: User[] = [];
  private fullWorkingSet: User[] = [];

  constructor(public dialog: MatDialog, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if(params["user"]) {
        console.log("User: ", params["user"]);
      }
      console.log(params);
    })
  }

  filterResults(): void {
    this.users = this.fullWorkingSet;
    this.users = this.users.filter((val: User) => {
      return val.name.includes(this.filterCriteria);
    });
  }

  openAddUserDialog(): void {
    const openAddUserDialogRef = this.dialog.open(AddUserComponent, {
      width: '650px',
    });
    
    openAddUserDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    for(let i = 0; i < 696; i++) {
      this.users.push({ id: i, name: `Name ${i}`, role: "Spadochroniarz "});
    }

    this.fullWorkingSet = this.users;
  }

}
