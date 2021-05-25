import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntreprisePage } from './entreprise.page';

const routes: Routes = [
  {
    path: '',
    component: EntreprisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntreprisePageRoutingModule {}
