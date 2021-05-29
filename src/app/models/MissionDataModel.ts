import { MissionStatus } from "../enums/MissionStatus";
import {TacheDataModel} from "./TacheDataModel";

export class MissionDataModel {

  id?:string;
  entreprise:string;
  titre:string;
  nomTechnicien:string;
  chefDeChantier:string;
  date:string;
  taches:TacheDataModel[];
  status:number;
  isActivated:boolean;


  constructor(entreprise:string = "",nom:string = "",date:string = "", nomTechnicien= "", chefDeChantier="",taches:TacheDataModel[] = [], status:number = MissionStatus.EN_COURS, isActivated:boolean = false) {
    this.entreprise = entreprise;
    this.titre = nom ;
    this.date = date ;
    this.nomTechnicien= nomTechnicien;
    this.chefDeChantier= chefDeChantier;
    this.taches = taches;
    this.status = status;
    this.isActivated = isActivated;
  }

}
