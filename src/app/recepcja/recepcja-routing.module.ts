import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';
import { RecpGuard } from '../Guard/recp-guard';
import { RouteGuard } from '../Guard/route-guard';
import { DodajWizyteComponent } from './dodaj-wizyte/dodaj-wizyte.component';

/*
  TO JEST MODUŁ ROUTERA
  TUTAJ ZNAJDUJĄ SIĘ WSZYSTKIE ŚCIEŻKI W APLIKACJI :)
  A PRZYNAJMNIEJ STANDARDOWE ENDPOINTY
*/
const routes: Routes = [
  { path: 'recepcja', canActivate: [RouteGuard, RecpGuard], component: ListaWizytComponent },
  { path: 'recepcja/addvisit', canActivate: [RouteGuard, RecpGuard], component: DodajWizyteComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcjaRoutingModule { }
