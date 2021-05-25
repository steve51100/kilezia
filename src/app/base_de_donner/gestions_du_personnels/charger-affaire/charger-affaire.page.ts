import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-charger-affaire',
  templateUrl: './charger-affaire.page.html',
  styleUrls: ['./charger-affaire.page.scss'],
})
export class ChargerAffairePage implements OnInit {

  nom: "";
  date: "";
  prenom: "";
  fonction: "";
  telephone: "";
  mail: "";

  affaires = [];

  constructor(public afDB: AngularFireDatabase) {

    this.getAffaires();
  }

  ngOnInit() {
  }

  //ajout charger d'affaire dans firebase
  addAffaireToFirebase() {
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
    this.afDB.list('charger_affaires/').push({
      nom: this.nom,
      prenom: this.prenom,
      fonction: this.fonction,
      telephone: this.telephone,
      mail: this.mail,


    });
    this.nom = "";
    this.prenom = "";
    this.telephone = "";
    this.fonction = "";
    this.mail = "";
  }

  clear(){
    this.nom = "";
    this.prenom = "";
    this.telephone = "";
    this.fonction = "";
    this.mail = "";
  }
  
  //affichage charger d'affaire
  getAffaires() {
    this.afDB.list('charger_affaires/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.affaires = [];
      actions.forEach(action => {
        console.log('info:' + action.payload.exportVal().prenom);

        this.affaires.push({
          key: action.key,
          prenom: action.payload.exportVal().prenom,
          nom: action.payload.exportVal().nom,
        });
      });
    });
  }
  //supprimé charger d'affaire
  deleteAffaire(affaire: any) {
    this.afDB.list('charger_affaires/').remove(affaire.key);

  }
}
