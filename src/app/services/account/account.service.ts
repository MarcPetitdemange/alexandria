import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loggedUser: any;

  constructor(public ngFireAuth: AngularFireAuth,
     private db: AngularFireDatabase,
     private firestore: AngularFirestore,
     private storage: AngularFireStorage,
     private router: Router) { }

  async getCurrentUserInformations(){
    this.loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    return this.loggedUser;
  }

  async connect(credentials,error,valid){
    try{
      const userData = await this.ngFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
      this.loggedUser = userData.user;
      const moreInformationsPromise = await this.firestore.doc('/users/' + userData.user.uid).get().toPromise();
      const moreInformation: any = moreInformationsPromise.data();
      this.loggedUser.firstname = moreInformation.firstname;
      this.loggedUser.lastname = moreInformation.lastname;
      this.loggedUser.phone = moreInformation.phone;
      this.loggedUser.photo = await this.storage.ref(moreInformation.photo).getDownloadURL().toPromise();
      this.loggedUser.creationDate = new Date(userData.user.metadata.creationTime).toLocaleString();
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
  }

  signOut(){
    return this.ngFireAuth.signOut().then(() => {
      sessionStorage.removeItem('loggedUser');
      this.router.navigate(['login']);
    });
  }
}
