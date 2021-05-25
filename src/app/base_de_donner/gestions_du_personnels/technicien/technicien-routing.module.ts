import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicienPage } from './technicien.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicienPageRoutingModule {}
