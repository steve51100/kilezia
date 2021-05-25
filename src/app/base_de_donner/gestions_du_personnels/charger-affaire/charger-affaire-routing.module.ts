import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargerAffairePage } from './charger-affaire.page';

const routes: Routes = [
  {
    path: '',
    component: ChargerAffairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargerAffairePageRoutingModule {}
