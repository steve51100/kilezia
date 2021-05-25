import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppComponent } from './app.component';
import { IonicStorageModule} from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {PreviewAnyFile} from '@ionic-native/preview-any-file/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import { AppRoutingModule } from './app-routing.module';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { File }from '@ionic-native/file/ngx';
import { environment } from '../environments/environment';

export const firebaseConfig = {
   apiKey: "AIzaSyCL1EAeyaOG9jP2pRClklKs5UtRsUo1uwI",
    authDomain: "kilezia-37402.firebaseapp.com",
    databaseURL: "https://kilezia-37402-default-rtdb.firebaseio.com",
    projectId: "kilezia-37402",
    storageBucket: "kilezia-37402.appspot.com",
    messagingSenderId: "606945832097",
    appId: "1:606945832097:web:913980d5c93c53df35d4e0"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    DragDropModule, 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },PreviewAnyFile,FileOpener,File,EmailComposer],
  bootstrap: [AppComponent],
})
export class AppModule {}
