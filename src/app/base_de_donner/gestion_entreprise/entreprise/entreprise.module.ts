import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntreprisePageRoutingModule } from './entreprise-routing.module';

import { EntreprisePage } from './entreprise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntreprisePageRoutingModule
  ],
  declarations: [EntreprisePage]
})
export class EntreprisePageModule {}
