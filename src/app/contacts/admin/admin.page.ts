import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  administrations = [];
  affaires = [];
  techs = [];
  

  constructor(public afDB: AngularFireDatabase) {
    this.getTechs();
    this.getAffaires();
    this.getAdmin();
   }

  ngOnInit() {
  }
  getAdmin() {
    this.afDB.list('administrations/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.administrations = [];
      actions.forEach(action => {
       // console.log('info:' + action.payload.exportVal().prenom);
        
        this.administrations.push({
          key: action.key,
          prenom: action.payload.exportVal().prenom,
          nom:  action.payload.exportVal().nom,
          fonction:  action.payload.exportVal().fonction,
          telephone:  action.payload.exportVal().telephone,
          mail:  action.payload.exportVal().mail,
        });
      });
    });
  }
  getAffaires() {
    this.afDB.list('charger_affaires/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.affaires = [];
      actions.forEach(action => {
       // console.log('info:' + action.payload.exportVal().prenom);
        
        this.affaires.push({
          key: action.key,
          prenom: action.payload.exportVal().prenom,
          nom:  action.payload.exportVal().nom,
          fonction:  action.payload.exportVal().fonction,
          telephone:  action.payload.exportVal().telephone,
          mail:  action.payload.exportVal().mail,
        });
      });
    });
  }
  getTechs() {
    this.afDB.list('techniciens/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.techs = [];
      actions.forEach(action => {
       // console.log('info:' + action.payload.exportVal().prenom);
        
        this.techs.push({
          key: action.key,
          prenom: action.payload.exportVal().prenom,
          nom:  action.payload.exportVal().nom,
          fonction:  action.payload.exportVal().fonction,
          telephone:  action.payload.exportVal().telephone,
          mail:  action.payload.exportVal().mail,
        });
      });
    });
  }
}
