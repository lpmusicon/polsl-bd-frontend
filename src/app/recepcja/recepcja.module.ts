import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';
import { DodajWizyteComponent } from './dodaj-wizyte/dodaj-wizyte.component';
import { DodajPacjentaComponent } from './dodaj-pacjenta/dodaj-pacjenta.component';
import { AnulujWizyteComponent } from './anuluj-wizyte/anuluj-wizyte.component';
import { RecepcjaRoutingModule } from './recepcja-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatSelectFilterModule } from 'mat-select-filter';



@NgModule({
  declarations: [ListaWizytComponent, DodajWizyteComponent, DodajPacjentaComponent, AnulujWizyteComponent],
  imports: [
    RecepcjaRoutingModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    MatSelectFilterModule
  ],
  entryComponents: [
    AnulujWizyteComponent,
    DodajPacjentaComponent
  ]
})
export class RecepcjaModule { }
