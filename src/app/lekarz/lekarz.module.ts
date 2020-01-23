import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';
import { WizytaComponent } from './wizyta/wizyta.component';
import { BadanieFizykalneComponent } from './badanie-fizykalne/badanie-fizykalne.component';
import { LekarzRoutingModule } from './lekarz-routing.module';
import { MaterialModule } from '../material/material.module';
import { BadanieLaboratoryjneComponent } from './badanie-laboratoryjne/badanie-laboratoryjne.component';
import { PreviousVisitsComponent } from './wizyta/previous-visits/previous-visits.component';
import { ListExaminationsComponent } from './wizyta/list-examinations/list-examinations.component';
import { ListLabExaminationsComponent } from './wizyta/list-lab-examinations/list-lab-examinations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CancelVisitComponent } from './wizyta/cancel-visit/cancel-visit.component';


@NgModule({
  declarations: [
    ListaWizytComponent, 
    WizytaComponent, 
    BadanieFizykalneComponent, 
    BadanieLaboratoryjneComponent, 
    PreviousVisitsComponent, 
    ListExaminationsComponent, 
    ListLabExaminationsComponent, 
    CancelVisitComponent
  ],
  imports: [
    LekarzRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    BadanieFizykalneComponent,
    BadanieLaboratoryjneComponent,
    CancelVisitComponent
  ]
})
export class LekarzModule { }
