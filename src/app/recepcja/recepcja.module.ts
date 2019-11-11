import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';
import { DodajWizyteComponent } from './dodaj-wizyte/dodaj-wizyte.component';
import { DodajPacjentaComponent } from './dodaj-pacjenta/dodaj-pacjenta.component';
import { RecepcjaRoutingModule } from './recepcja-routing.module';



@NgModule({
  declarations: [ListaWizytComponent, DodajWizyteComponent, DodajPacjentaComponent],
  imports: [
    RecepcjaRoutingModule,
    CommonModule
  ]
})
export class RecepcjaModule { }
