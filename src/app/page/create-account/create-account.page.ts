import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  error: string;
  credentialsForm: any = {};

  constructor(public ngFireAuth: AngularFireAuth,
     private firestorage: AngularFireStorage,
     private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.credentialsForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  submit(){
    this.ngFireAuth.createUserWithEmailAndPassword(this.credentialsForm.email,this.credentialsForm.password).then((userCredential) => {
      const user = {
        uid: userCredential.user.uid,
        lastname: this.credentialsForm.lastname,
        firstname: this.credentialsForm.firstname,
        phone: this.credentialsForm.phone
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


    if(this.credentialsForm.photo != null && this.credentialsForm.photo.webviewPath != null){
      const response = await fetch(this.credentialsForm.photo.webviewPath);
      const blob = await response.blob();
      this.firestorage.upload('/userPictures/' + user.uid, blob);
    }

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
    this.credentialsForm.reset();
  }
}
