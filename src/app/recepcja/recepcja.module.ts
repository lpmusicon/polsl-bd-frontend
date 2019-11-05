import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';
import { DodajWizyteComponent } from './dodaj-wizyte/dodaj-wizyte.component';
import { DodajPacjentaComponent } from './dodaj-pacjenta/dodaj-pacjenta.component';



@NgModule({
  declarations: [ListaWizytComponent, DodajWizyteComponent, DodajPacjentaComponent],
  imports: [
    CommonModule
  ]
})
export class RecepcjaModule { }
