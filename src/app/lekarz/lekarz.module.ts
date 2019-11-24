import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';
import { WizytaComponent } from './wizyta/wizyta.component';
import { BadanieFizykalneComponent } from './badanie-fizykalne/badanie-fizykalne.component';
import { LekarzRoutingModule } from './lekarz-routing.module';
import { MaterialModule } from '../material/material.module';
import { BadanieLaboratoryjneComponent } from './badanie-laboratoryjne/badanie-laboratoryjne.component';



@NgModule({
  declarations: [ListaWizytComponent, WizytaComponent, BadanieFizykalneComponent, BadanieLaboratoryjneComponent],
  imports: [
    LekarzRoutingModule,
    CommonModule,
    MaterialModule,
  ],
  entryComponents: [
    BadanieFizykalneComponent,
    BadanieLaboratoryjneComponent
  ]
})
export class LekarzModule { }
