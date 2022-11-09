import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  public bookCollectionRef;

  constructor(
    private db: AngularFireDatabase, private firestore: AngularFirestore) {
      this.bookCollectionRef = this.firestore.collection('books');
    }


  getAllLibrary() {
    return this.bookCollectionRef.get();
  }

  editBook(book){
    debugger;
    return this.firestore.doc('/books/' + book.id).update(book);
  }

  deleteBookById(id: string) {
    const bookRef = this.firestore.doc('/books/' + id);
    bookRef.delete();
  }

  addBook(book: any){
    // book.categories = book.categories.map(category => this.bookCollectionRef.doc(category.id).ref);
    return this.bookCollectionRef.add(book);
  }
}
