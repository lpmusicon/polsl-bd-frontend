import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';
import { DoctorGuard } from '../Guard/doctor-guard';
import { RouteGuard } from '../Guard/route-guard';

/*
  TO JEST MODUŁ ROUTERA
  TUTAJ ZNAJDUJĄ SIĘ WSZYSTKIE ŚCIEŻKI W APLIKACJI :)
  A PRZYNAJMNIEJ STANDARDOWE ENDPOINTY
*/
const routes: Routes = [
  { path: 'lekarz', canActivate: [RouteGuard, DoctorGuard], canLoad: [RouteGuard, DoctorGuard], component: ListaWizytComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LekarzRoutingModule { }
