import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargerAffairePageRoutingModule } from './charger-affaire-routing.module';

import { ChargerAffairePage } from './charger-affaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargerAffairePageRoutingModule
  ],
  declarations: [ChargerAffairePage]
})
export class ChargerAffairePageModule {}
