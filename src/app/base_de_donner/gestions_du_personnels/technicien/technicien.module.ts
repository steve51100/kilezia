import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicienPageRoutingModule } from './technicien-routing.module';

import { TechnicienPage } from './technicien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicienPageRoutingModule
  ],
  declarations: [TechnicienPage]
})
export class TechnicienPageModule {}
