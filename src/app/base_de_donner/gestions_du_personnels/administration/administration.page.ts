import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

 
   nom : "";
   date:"";
   prenom: "";
   fonction: "";
   telephone: "";
   mail: "";
   
   administrations =[];

  constructor(
    public afDB: AngularFireDatabase,
  ) {
    this.getadminstration();
   }

  ngOnInit() :void {
  }

   //ajout charger d'affaire dans firebase
   addadminstrationToFirebase(){
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
    this.afDB.list('administrations/').push({
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
  annuler(){
    this.nom = "";
    this.prenom = "";
    this.telephone = "";
    this.fonction ="";
    this.mail = "";
  }

 //affichage administration
 getadminstration() {
  this.afDB.list('administrations/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
    this.administrations = [];
    actions.forEach(action => {
      console.log('info:' + action.payload.exportVal().prenom);
      
      this.administrations.push({
        key: action.key,
        prenom: action.payload.exportVal().prenom,
        nom:  action.payload.exportVal().nom,
      });
    });
  });
  }
  //supprimé administration
  deleteAdministration(administration: any){
    this.afDB.list('administrations/').remove(administration.key);

  } 
}
