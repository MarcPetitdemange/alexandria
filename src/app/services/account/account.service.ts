import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public ngFireAuth: AngularFireAuth,  private db: AngularFireDatabase, private firestore: AngularFirestore, private router: Router) { }

  async getCurrentUserInformations(){
    return this.ngFireAuth.currentUser.then(user => {
      debugger;
      this.db.object('/users/' + user.uid);
    });
  }

  connect(credentials,error,valid){
    this.ngFireAuth.setPersistence('session').then(() => {
      this.ngFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then(value => {
        valid = true;
        error = null;
        setTimeout(() => this.router.navigateByUrl('/tabs', { replaceUrl:true }), 1000);
      }).catch(error => {
        error = error;
        valid = false;
      });
    });
  }
}
