import { Component, OnInit, ViewChild} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MissionDataModel } from "../../models/MissionDataModel";
import { MissionDataService, MissionModel } from "../../services/mission-data.service";
import { Observable } from "rxjs";
import { AlertController, IonReorderGroup } from "@ionic/angular";
import { ToastController } from '@ionic/angular';
import { TacheDataModel } from "../../models/TacheDataModel";
import { ModalController} from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ItemReorderEventDetail } from '@ionic/core';

import { MissionStatus } from "../../enums/MissionStatus";

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

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
  missionsObservable:Observable<MissionDataModel[]>;
  missions: MissionDataModel[] = [];
  items: string[];

  // L'utilisateur peut reordonner la liste
  canReorder:boolean  = false;
  
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
    this.missionDataService.getMissions().subscribe(missions => {
      this.missions = missions;
    });
  }

  getMissionsEnCours(){
    return this.missions.filter(m => m.status === undefined || m.status === MissionStatus.EN_COURS);
  }

  getMissionsRecurrentes(){
    return this.missions.filter(m => m.status === MissionStatus.RECURRENT);
  }

  getMissionsTerminees(){
    return this.missions.filter(m => m.status === MissionStatus.TERMINE);
  }

  onModifierMission(mission: MissionDataModel){
    this.mission = mission;
  }

  onMissionActivationChanged(ev,mission: MissionDataModel){
    mission.isActivated = ev.detail.checked;
    this.missionDataService.updateMission(mission);
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {

    if(ev.detail.to == 0){
      //ev.detail.to = ev.detail.from;
      ev.detail.complete(false);
      return;
    }

    ev.detail.complete();
      
    let status:number;

    const children = Array.from(ev.target['children']);

    const indexRecurrentes  = children.findIndex(elt => elt['id'] == "missions-recurrentes");
    const indexTerminees    = children.findIndex(elt => elt['id'] == "missions-terminees");

    // On descend
    if(ev.detail.from < ev.detail.to){
      if(ev.detail.to >= indexTerminees){
        status = MissionStatus.TERMINE;
      }
      else if(ev.detail.to >= indexRecurrentes){
        status = MissionStatus.RECURRENT;
      }
      else{
        status = MissionStatus.EN_COURS;
      }
      console.log(Array.from(ev.target['children']));
    }
    // On monte
    else{
      if(ev.detail.to <= indexRecurrentes){
        status = MissionStatus.EN_COURS;
      }
      else if(ev.detail.to <= indexTerminees){
        status = MissionStatus.RECURRENT;
      }
      else{
        status = MissionStatus.TERMINE;
      }
      console.log(Array.from(ev.target['children']));
    }

    setTimeout(()=>{
      console.log("After 1 seconde",Array.from(ev.target['children']));
    },1000)

    
    const id = Array.from(ev.target['children']).filter((e,index) => index ===  ev.detail.to)[0]['id']

    const mission = this.missions.find(m => m.id === id);
    mission.status = status;
    this.missionDataService.updateMission(mission);

    

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
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
