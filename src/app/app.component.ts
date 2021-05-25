import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  connected: boolean;
  base: boolean;
  mission:boolean;
  contact:boolean;
  personnels:boolean;
  entreprises:boolean;
  userId='';
  pdf:boolean;

  constructor(public toastController: ToastController,
    public afDB: AngularFireDatabase,
    private router: Router,
    public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(auth => {
        if (!auth) {
          this.connected = false;
          let menu = document.getElementById('menu');
          menu.style.display = "none";
          this.router.navigateByUrl('/connection');

        } else {
          this.connected = true;
          this.userId = auth.uid;
          let menu = document.getElementById('menu');
          menu.style.display = "block";
        }
      });
    }
    logout() {
      this.afAuth.signOut();
      this.router.navigateByUrl('/connection');

    }
  
  //affichage menu
  showBase(){
    this.base = !this.base;
  }
  showMission(){
    this.mission = !this.mission;
  }
  showContact(){
    this.contact = !this.contact;
  }
  showPersonnels(){
    this.personnels = !this.personnels;
  }
  showEntreprises(){
    this.entreprises = !this.entreprises;
  }
  showPdf(){
    this.pdf = !this.pdf;
  }
}
