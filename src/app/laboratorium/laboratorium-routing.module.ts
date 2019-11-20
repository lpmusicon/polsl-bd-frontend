import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaBadanComponent } from './lista-badan/lista-badan.component';
import { LabWGuard } from '../Guard/labw-guard';
import { RouteGuard } from '../Guard/route-guard';

/*
  TO JEST MODUŁ ROUTERA
  TUTAJ ZNAJDUJĄ SIĘ WSZYSTKIE ŚCIEŻKI W APLIKACJI :)
  A PRZYNAJMNIEJ STANDARDOWE ENDPOINTY
*/
const routes: Routes = [
  { path: 'lab', canActivate: [RouteGuard, LabWGuard], component: ListaBadanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoriumRoutingModule { }
