import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.page.html',
  styleUrls: ['./entreprise.page.scss'],
})
export class EntreprisePage implements OnInit {

  nomEntreprise: "";
  adresse: "";
  numero: "";
  cp: "";
  ville: "";

  entreprises = [];

  constructor(public afDB: AngularFireDatabase) {
    this.getEntreprise();
  }

  ngOnInit() {
  }
  //ajout entreprise dans firebase
  addEntrepriseToFirebase() {
    if (this.nomEntreprise == '') {
      alert('le champ nom est vide')
      return;
    }
    else if (this.adresse == '') {
      alert('le champ adresse est vide')
      return;
    }
    else if (this.numero == '') {
      alert('le champ numéro est vide')
      return;
    }
    else if (this.cp == '') {
      alert('le champ code postal est vide')
      return;
    }
    else if (this.ville == '') {
      alert('le champ ville est vide')
      return;
    }

    this.afDB.list('entreprise/').push({
      nom: this.nomEntreprise,
      adresse: this.adresse,
      numero: this.numero,
      cp: this.cp,
      ville: this.ville


    });
    this.nomEntreprise = "";
    this.adresse = "";
    this.numero ="";
    this.cp = "";
    this.ville= "";
  }
  //affichage entreprise
  getEntreprise() {
    this.afDB.list('entreprise/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.entreprises = [];
      actions.forEach(action => {
        console.log('info:' + action.payload.exportVal().prenom);

        this.entreprises.push({
          key: action.key,
          nom: action.payload.exportVal().nom,
        });
      });
    });
  }
  clear(){
    this.nomEntreprise = "";
    this.adresse = "";
    this.numero ="";
    this.cp = "";
    this.ville= "";
  }
  //supprimé entreprise
  deleteEntreprise(entreprise: any) {
    this.afDB.list('entreprise/').remove(entreprise.key);

  }
}
