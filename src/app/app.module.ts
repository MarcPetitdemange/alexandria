import { SelectPictureComponent } from './component/shared/select-picture/select-picture.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


export const firebaseConfig = {
  apiKey: "AIzaSyAEnBp7DKlRAy-qlRM_IoT2N27NiC2yqfg",
  authDomain: "alexandria-2c577.firebaseapp.com",
  projectId: "alexandria-2c577",
  storageBucket: "alexandria-2c577.appspot.com",
  messagingSenderId: "455937122552",
  appId: "1:455937122552:web:8278a56e6a2aa55db75b0d",
  measurementId: "G-93T6RL3P42"
};

@NgModule({
  declarations: [AppComponent, SelectPictureComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
