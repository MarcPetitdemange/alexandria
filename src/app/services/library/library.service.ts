import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Book from 'src/app/model/Book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  public bookCollectionRef;

  constructor(private firestore: AngularFirestore) {
      this.bookCollectionRef = this.firestore.collection('books');
    }


  getAllLibrary() {
    return this.bookCollectionRef.get();
  }

  editBook(book: Book){
    return this.firestore.doc('/books/' + book.$id).update(book);
  }

  deleteBookById(id: string) {
    const bookRef = this.firestore.doc('/books/' + id);
    bookRef.delete();
  }

  addBook(book: Book){
    return this.bookCollectionRef.add(book);
  }
}
