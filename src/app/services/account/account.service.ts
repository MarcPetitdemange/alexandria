import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Photo } from 'src/app/model/Photo';
import { User } from 'src/app/model/User';
import { PicturesService } from '../pictures/pictures.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loggedUser: User;

  constructor(public ngFireAuth: AngularFireAuth,
     private db: AngularFireDatabase,
     private firestore: AngularFirestore,
     private storage: AngularFireStorage,
     private router: Router,
     private picturesService: PicturesService) { }

  async createUserAccount(credential: User) {
    try{
      const userCredential: any  = await this.ngFireAuth.createUserWithEmailAndPassword(credential.email,credential.password);
      credential.uid = userCredential.user.uid;
      this.createUserData(credential);
      setTimeout(() => this.router.navigateByUrl('/login', { replaceUrl:true }), 1000);
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

  async createUserData(credential: User) {
    debugger;
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${credential.uid}`
    );
    credential.photo = credential.photo as Photo;
    this.removePasswords(credential);
    if(credential.photo != null && credential.photo.webviewPath != null){
      this.picturesService.uploadUserPicture(credential.uid, credential.photo.webviewPath)
      credential.photo = '/userPictures/' + credential.uid;
    }
    return userRef.set(credential, {
      merge: true,
    });
  }

  removePasswords(credential: User) {
    credential.password = null;
    credential.confirmPassword = null;
    delete credential.password;
    delete credential.confirmPassword;
  }

  async getCurrentUserInformations(){
    this.loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    return this.loggedUser;
  }

  async connect(credentials,error,valid){
    try{
      const userData: any = await this.ngFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
      this.loggedUser = userData.user;
      const moreInformationsPromise = await this.firestore.doc('/users/' + userData.user.uid).get().toPromise();
      const moreInformation: User = moreInformationsPromise.data() as User;
      moreInformation.photo = moreInformation.photo as string;
      this.loggedUser.firstname = moreInformation.firstname;
      this.loggedUser.lastname = moreInformation.lastname;
      this.loggedUser.phone = moreInformation.phone;
      this.loggedUser.photo = await this.picturesService.getPictureUrl(moreInformation.photo);
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
