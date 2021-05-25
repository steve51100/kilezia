import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteDeServicePage } from './note-de-service.page';

const routes: Routes = [
  {
    path: '',
    component: NoteDeServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteDeServicePageRoutingModule {}
