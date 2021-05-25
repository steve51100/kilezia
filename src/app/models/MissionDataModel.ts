import {TacheDataModel} from "./TacheDataModel";

export class MissionDataModel {

  id?:string;
  entreprise:string;
  titre:string;
  nomTechnicien:string;
  chefDeChantier:string;
  date:string;
  taches:TacheDataModel[];
  


  constructor(entreprise:string = "",nom:string = "",date:string = "", nomTechnicien= "", chefDeChantier="",taches:TacheDataModel[] = []) {
    this.entreprise = entreprise;
    this.titre = nom ;
    this.date = date ;
    this.nomTechnicien= nomTechnicien;
    this.chefDeChantier= chefDeChantier;
    this.taches = taches;
  }

}
