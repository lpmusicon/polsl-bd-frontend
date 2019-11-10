import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  public onSubmit(event: any): void {
    this.router.navigateByUrl('admin');
  }
}
