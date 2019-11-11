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
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'lab', loadChildren: () => import('./laboratorium/laboratorium.module').then(m => m.LaboratoriumModule)},
  { path: 'lekarz', loadChildren: () => import('./lekarz/lekarz.module').then(m => m.LekarzModule)},
  { path: 'recepcja', loadChildren: () => import('./recepcja/recepcja.module').then(m => m.RecepcjaModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
