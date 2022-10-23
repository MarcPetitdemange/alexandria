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

  loggedUser: any;

  constructor(public ngFireAuth: AngularFireAuth,  private db: AngularFireDatabase, private firestore: AngularFirestore, private router: Router) { }

  async getCurrentUserInformations(){
    this.loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    debugger;
    return this.loggedUser;
  }

  async connect(credentials,error,valid){

    try{
      const userData = await this.ngFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
      this.loggedUser = userData.user;
      sessionStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
      setTimeout(() => this.router.navigateByUrl('/tabs', { replaceUrl:true }), 1000);
      return {
        valid: true,
        error: null,
      };
    } catch (e){
      return {
        valid: false,
        error: e,
      };
    }

  //   .then(value => {
  //     this.loggedUser = value.user;
  //     sessionStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
  //     valid = true;
  //     error = null;
  //     return {
  //       valid: true,
  //       error: null,
  //     };
  //   }).catch(error => {
  //     error = error;
  //     valid = false;
  //     return {
  //       valid: false,
  //       error,
  //     };
  //   });
  // }
  }
}
