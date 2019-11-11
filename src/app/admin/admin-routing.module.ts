import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';

/*
  TO JEST MODUŁ ROUTERA
  TUTAJ ZNAJDUJĄ SIĘ WSZYSTKIE ŚCIEŻKI W APLIKACJI :)
  A PRZYNAJMNIEJ STANDARDOWE ENDPOINTY
*/
const routes: Routes = [
  { path: 'admin', component: ListUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
