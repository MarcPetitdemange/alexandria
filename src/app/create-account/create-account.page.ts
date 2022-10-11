import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { getAuth} from "firebase/auth";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  credentials: any = {
    email : "",
    password: "",
    firstname: "",
    lastname: "",
    login: "",
  };

  constructor(public ngFireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  createAccount(){
    this.ngFireAuth.createUserWithEmailAndPassword(this.credentials.email,this.credentials.password).then((userCredential) => {
      const user = userCredential.user;
      this.setUserData(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }


  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}
