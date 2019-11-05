import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaWizytComponent } from './lista-wizyt/lista-wizyt.component';
import { WizytaComponent } from './wizyta/wizyta.component';
import { BadanieFizykalneComponent } from './badanie-fizykalne/badanie-fizykalne.component';



@NgModule({
  declarations: [ListaWizytComponent, WizytaComponent, BadanieFizykalneComponent],
  imports: [
    CommonModule
  ]
})
export class LekarzModule { }
