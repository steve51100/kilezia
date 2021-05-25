import { Component} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {MissionDataModel} from "../../models/MissionDataModel";
import {MissionDataService} from "../../services/mission-data.service";
import {Observable} from "rxjs";
import {AlertController} from "@ionic/angular";
import { ToastController } from '@ionic/angular';
import { TacheDataModel } from "../../models/TacheDataModel";
import { ModalController} from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';


@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage  {

  addform:boolean;
  fini:boolean;
  techs = [];
  entreprises = [];
  Taches = true;

  

  newTache: TacheDataModel = {
    nom: [],
    date: '',
    nomTechnicien:[],
    chefDeChantier:[],
    termine: false
  };
  mission: MissionDataModel = new MissionDataModel();
  missions:Observable<MissionDataModel[]>;
  items: string[];
  
  constructor(
    public afDB: AngularFireDatabase,
    public toastController: ToastController, 
    private missionDataService: MissionDataService,
    public afAuth: AngularFireAuth,
    private router: Router,
    public alertController: AlertController,
    private modalController:ModalController
   
  ) {
    this.getTechs();
    this.getEntreprise();
   }
   // Récupérer la liste des missions quand on entre dans la peg
  ngOnInit(){
    this.missions = this.missionDataService.getMissions();
    
    
  }

  // Récupérer la liste des missions quand on entre dans la peg
  addTache() {
    if (this.newTache.nom == null) {
      this.presentToast("Veuillez entrer une tache minimum");
      return;
    }
    this.mission.taches.push(this.newTache);
    this.newTache = {
      nom: null,
      date: "",
      nomTechnicien:null,
      chefDeChantier:null,
      termine: false
    };
  }

  supprimerTache(tache) {
    this.mission.taches = this.mission.taches.filter(t => t != tache);
  }

  saveMission() {
    // Afficher un message si l'utilisateur n'a pas tout rempli
    if (!this.missionDataService.validateMission(this.mission)) {
      this.presentToast("Veuillez entrer tous les champs de la mission")
      return;
    }

    // Ajouter la mission dans la base de donnés
    this.missionDataService.addMission(this.mission).then(() => {
      // Reinitialiser la mission
      this.mission = new MissionDataModel();

      //Afficher un message
      this.presentToast("Mission ajoutée")
    });

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
 

   // Supprimer une mission
   async supprimerMission(mission){
    const alert = await this.alertController.create({
      header: 'Suppression de mission',
      message: 'Êtes vous sûr de vouloir supprimer cette mission ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Supprimer',
          handler: () => {
            this.missionDataService.deleteMission(mission.id)
          }
        }
      ]
    });

    await alert.present();
  }

  signOut(){
    this.afAuth.signOut();
    this.router.navigateByUrl('/connection')
  }

  //affichage charger d'affaire
  getTechs() {
    this.afDB.list('techniciens/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.techs = [];
      actions.forEach(action => {
        console.log('info:' + action.payload.exportVal().prenom);
        
        this.techs.push({
          key: action.key,
          prenom: action.payload.exportVal().prenom,
          fonction: action.payload.exportVal().fonction,
          nom:  action.payload.exportVal().nom,
        });
      });
    });
  }

   //affichage entreprise
  getEntreprise() {
    this.afDB.list('entreprise/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.entreprises = [];
      actions.forEach(action => {
        console.log('info:' + action.payload.exportVal().prenom);
        
        this.entreprises.push({
          key: action.key,
          nom:  action.payload.exportVal().nom,
        });
      });
    });
  }
  annuler(){
    this.mission = new MissionDataModel();
   
  }
  OpenModal(){
    this.modalController.create({component:ModalInfoPage}).then((modalElement)=>{
      modalElement.present();
    })
  }
 
  showFin(){
    this.fini = !this.fini;
  }
  
}
