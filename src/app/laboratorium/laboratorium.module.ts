import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaBadanComponent } from './lista-badan/lista-badan.component';
import { WykonajBadanieComponent } from './wykonaj-badanie/wykonaj-badanie.component';
import { AnulujBadanieComponent } from './anuluj-badanie/anuluj-badanie.component';
import { LaboratoriumRoutingModule } from './laboratorium-routing.module';



@NgModule({
  declarations: [ListaBadanComponent, WykonajBadanieComponent, AnulujBadanieComponent],
  imports: [
    CommonModule,
    LaboratoriumRoutingModule
  ]
})
export class LaboratoriumModule { }
