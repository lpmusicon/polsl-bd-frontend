import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';

/*
  TO JEST MODUŁ ROUTERA
  TUTAJ ZNAJDUJĄ SIĘ WSZYSTKIE ŚCIEŻKI W APLIKACJI :)
  A PRZYNAJMNIEJ STANDARDOWE ENDPOINTY
*/
const routes: Routes = [
  { path: 'recepcja', component: ListaWizytComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcjaRoutingModule { }
