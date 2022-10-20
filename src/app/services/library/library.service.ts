import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(
    private db: AngularFireDatabase, private firestore: AngularFirestore) { }


  getAllLibrary() {
    return this.firestore.collection('books').get();
  }

  deleteBookById(id: string) {
    const bookRef = this.firestore.doc('/books/' + id);
    bookRef.delete();
  }

  addBook(book: any){
    return this.firestore.collection('books').add(book);
  }
}
