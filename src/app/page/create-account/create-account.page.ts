import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  error: string;
  credentials: any = {};

  constructor(public ngFireAuth: AngularFireAuth, private firestorage: AngularFireStorage, private firestore: AngularFirestore, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }


  async pictureChoice(){
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          handler: () => this.takePicture()
        },
        {
          text: 'Gallery',
          role: 'destructive',
          handler: () => this.choosePictureFromGallery()
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ]
    });

    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
  }

  async takePicture() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.credentials.photo = {
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    };
  }

  cancelPicture(){
    this.credentials.photo = null;
  }

  async choosePictureFromGallery(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });

    this.credentials.photo = {
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    };
  }

  createAccount(){
    this.ngFireAuth.createUserWithEmailAndPassword(this.credentials.email,this.credentials.password).then((userCredential) => {
      debugger;
      const user = {
        uid: userCredential.user.uid,
        lastname: this.credentials.lastname,
        firstname: this.credentials.firstname,
        phone: this.credentials.phone
      };
      this.setUserData(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.error = errorMessage;
    });
  }


  async setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );


    const response = await fetch(this.credentials.photo.webviewPath);
    const blob = await response.blob();
    this.firestorage.upload('/userPictures/' + user.uid, blob);

    const userData: any = {
      uid: user.uid,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      photo: '/userPictures/' + user.uid
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  cancel(){
    this.credentials = {};
  }
}
