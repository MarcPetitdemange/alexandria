import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  error: string;
  credentials: any = {};

  constructor(public ngFireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  takePicture() {
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      const imageUrl = image.webPath;
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


  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  cancel(){
    this.credentials = {};
  }
}
