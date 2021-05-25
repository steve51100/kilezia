import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.page.html',
  styleUrls: ['./connection.page.scss'],
})
export class ConnectionPage implements OnInit {

  dataUser = {
    email: '',
    password: ''
 };

 connected: boolean;
  constructor(public toastController: ToastController,
    public afDB: AngularFireDatabase,
    private router: Router,
    public afAuth: AngularFireAuth) { 
      this.afAuth.authState.subscribe(auth => {
        if (!auth) {
        //  console.log('non connecté');
          this.connected = false;
        } else {
        //  console.log('connecté: ' + auth.uid);
          this.connected = true;
        }
      });
     }

  ngOnInit() {
  }
  login(){
    //console.log('email:' + this.dataUser.email);
    //console.log( 'password' +this.dataUser.password);

    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password)
    .then(auth => {
      //console.log('utilisateur connecté');
      this.router.navigateByUrl('/missions');
      this.dataUser.email = '';
      this.dataUser.password = '';
    })
    .catch(err => {
      console.log('Erreur: ' + err);
      this.errorMail();
      this.dataUser.email = '';
      this.dataUser.password = '';
    });
  }
  async errorMail() {
    const toast = await this.toastController.create({
      message: 'Email ou mot de passe incorrect',
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}
