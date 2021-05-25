import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.page.html',
  styleUrls: ['./technicien.page.scss'],
})
export class TechnicienPage implements OnInit {

  nom : "";
   date:"";
   prenom: "";
   fonction: "";
   telephone: "";
   mail: "";

   techs = [];

  constructor(public afDB: AngularFireDatabase) { this.getTechs(); }

  ngOnInit() {
  }
 //ajout charger d'affaire dans firebase
 addTechToFirebase(){
  if (this.nom == '') {
    alert('le champ nom est vide')
    return;
  }
  else if (this.prenom == '') {
    alert('le champ prénom est vide')
    return;
  }
  else if (this.telephone == '') {
    alert('le champ téléphone est vide')
    return;
  }
  else if (this.fonction == '') {
    alert('le champ fonction est vide')
    return;
  }
  if (this.mail == '') {
    alert('le champ émail est vide')
    return;
  }
  this.afDB.list('techniciens/').push({
    nom: this.nom,
    prenom: this.prenom,
    fonction: this.fonction,
    telephone: this.telephone,
    mail: this.mail,
   
    
  });
  this.nom = "";
  this.prenom = "";
  this.telephone = "";
  this.fonction ="";
  this.mail = "";
}
clear(){
  this.nom = "";
  this.prenom = "";
  this.telephone = "";
  this.fonction = "";
  this.mail = "";
}
getTechs() {
  this.afDB.list('techniciens/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
    this.techs = [];
    actions.forEach(action => {
      console.log('info:' + action.payload.exportVal().prenom);
      
      this.techs.push({
        key: action.key,
        prenom: action.payload.exportVal().prenom,
        nom:  action.payload.exportVal().nom,
      });
    });
  });
}
//supprimé tech
deleteTech(tech: any){
  this.afDB.list('techniciens/').remove(tech.key);

}
}
