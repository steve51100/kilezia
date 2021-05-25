import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteDeServicePageRoutingModule } from './note-de-service-routing.module';

import { NoteDeServicePage } from './note-de-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteDeServicePageRoutingModule
  ],
  declarations: [NoteDeServicePage]
})
export class NoteDeServicePageModule {}
