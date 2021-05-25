import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'connection',
    pathMatch: 'full'
  },
  {
    path: 'missions',
    loadChildren: () => import('./missions/missions/missions.module').then( m => m.MissionsPageModule)
  },
  {
    path: 'mission/:id',
    loadChildren: () => import('./mission/mission.module').then( m => m.MissionPageModule)
  },
  {
    path: 'modal-info',
    loadChildren: () => import('./missions/modal-info/modal-info.module').then( m => m.ModalInfoPageModule)
  },
  {
    path: 'note-de-service',
    loadChildren: () => import('./note/note-de-service/note-de-service.module').then( m => m.NoteDeServicePageModule)
  },
  {
    path: 'administration',
    loadChildren: () => import('./base_de_donner/gestions_du_personnels/administration/administration.module').then( m => m.AdministrationPageModule)
  },
  {
    path: 'charger-affaire',
    loadChildren: () => import('./base_de_donner/gestions_du_personnels/charger-affaire/charger-affaire.module').then( m => m.ChargerAffairePageModule)
  },
  {
    path: 'technicien',
    loadChildren: () => import('./base_de_donner/gestions_du_personnels/technicien/technicien.module').then( m => m.TechnicienPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./contacts/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'entreprise',
    loadChildren: () => import('./base_de_donner/gestion_entreprise/entreprise/entreprise.module').then( m => m.EntreprisePageModule)
  },
  {
    path: 'connection',
    loadChildren: () => import('./connection/connection.module').then( m => m.ConnectionPageModule)
  },
  {
    path: 'planning',
    loadChildren: () => import('./planning/planning.module').then( m => m.PlanningPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
