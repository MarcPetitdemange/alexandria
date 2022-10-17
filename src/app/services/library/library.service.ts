import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  bookRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase, private firestore: AngularFirestore) { }


  getAllLibrary() {
    return this.firestore.collection('books').get();
  }

  deleteBookById(id: string) {
    this.bookRef = this.db.object('/books/' + id);
    this.bookRef.remove();
  }

  addBook(book: any){
    this.firestore.collection('books').add(book);
  }
}
