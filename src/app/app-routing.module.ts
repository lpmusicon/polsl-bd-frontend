import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginBoxComponent } from './login-box/login-box.component';

/*
  TO JEST MODUŁ ROUTERA
  TUTAJ ZNAJDUJĄ SIĘ WSZYSTKIE ŚCIEŻKI W APLIKACJI :)
  A PRZYNAJMNIEJ STANDARDOWE ENDPOINTY
*/
const routes: Routes = [
  { path: '', component: LoginBoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
