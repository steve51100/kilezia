import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MissionDataModel} from "../models/MissionDataModel";

export interface MissionModel {
  id?: string,
  name: string,
  notes: string
}

@Injectable({
  providedIn: 'root'
})
export class MissionDataService {

  private missions: Observable<MissionDataModel[]>;
  private missionCollection: AngularFirestoreCollection<MissionDataModel>;

  constructor(private afs: AngularFirestore) {
    // Récupère la liste des missions
    this.missionCollection = this.afs.collection<MissionDataModel>('missions');

    // A chaque modification de la liste des missions dans firestore, mettre à jour la liste locale
    this.missions = this.missionCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Getter pour la liste des missions
  public getMissions(): Observable<MissionDataModel[]> {
    return this.missions;
  }

  // Getter pour une mission
  public getMission(id: string): Observable<MissionDataModel> {
    return this.missionCollection.doc<MissionDataModel>(id).valueChanges().pipe(
      take(1),
      map(mission => {
        mission.id = id;
        return mission
      })
    );
  }

  // Enregister une mission dans la liste des missions de firestore
  public addMission(mission: MissionDataModel): Promise<DocumentReference> {
    return this.missionCollection.add({ titre: mission.titre, taches: mission.taches, entreprise: mission.entreprise, date: mission.date, nomTechnicien: mission.nomTechnicien, chefDeChantier: mission.chefDeChantier, status: mission.status, isActivated: mission.isActivated});
  }

  // Mettre à jour une mission
  public updateMission(mission: MissionDataModel): Promise<void> {
    return this.missionCollection.doc(mission.id).update({ titre: mission.titre, taches: mission.taches, entreprise:mission.entreprise,date:mission.date, nomTechnicien: mission.nomTechnicien, chefDeChantier: mission.chefDeChantier, status: mission.status, isActivated: mission.isActivated});
  } 

  // affichage mission mission
  public afficheMission(mission: MissionDataModel): Promise<void> {
    return this.missionCollection.doc(mission.id).update({ titre: mission.titre, taches: mission.taches, entreprise:mission.entreprise,date:mission.date, nomTechnicien: mission.nomTechnicien, chefDeChantier: mission.chefDeChantier, status: mission.status, isActivated: mission.isActivated});
  } 

  // Supprimer une mission
  public deleteMission(id: string): Promise<void> {
    return this.missionCollection.doc(id).delete();
  }

  public validateMission(mission:MissionDataModel){
    return mission.entreprise != undefined && mission.entreprise.length != 0 &&
     mission.titre != undefined && mission.titre.length != 0//
     && mission.taches != undefined && mission.taches.length != 0 &&
     mission.date != undefined && mission.date.length != 0 &&
     mission.nomTechnicien != undefined && mission.nomTechnicien.length != 0 &&
     mission.chefDeChantier != undefined && mission.chefDeChantier.length != 0
      
  }
  

}