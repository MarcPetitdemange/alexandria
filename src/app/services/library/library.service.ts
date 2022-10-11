import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase, private firestore: AngularFirestore) { }


  getAllLibrary() {
    return this.firestore.collection('livres').snapshotChanges();
  }

  deleteBookById(id: string) {
    this.bookingRef = this.db.object('/livres/' + id);
    this.bookingRef.remove();
  }

  addBook(book: any){
    this.firestore.collection('livres').add(book);
  }
}
