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

  async getBooksByCategoryId(id: string) : Promise<Array<Book>> {
    let books: Array<Book> = new Array();
    let allBooks = await this.getAllLibrary().toPromise();
    allBooks.forEach(book => {
      if(book.categories){
        book.categories.forEach(category => {
          if(category.id === id){
            books.push(book);
          }
        })
      }
    });
    return Promise.resolve(books);
  }

  editBook(book: Book){
    return this.firestore.doc('/books/' + book.id).update(book);
  }

  deleteBookById(id: string) {
    const bookRef = this.firestore.doc('/books/' + id);
    bookRef.delete();
  }

  addBook(book: Book): Promise<Book>{
    const futureId = this.firestore.createId();
    book.id = futureId;
    return this.bookCollectionRef.doc(futureId).set(book);
  }
}
