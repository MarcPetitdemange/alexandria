import { LibraryService } from './../library/library.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Category from 'src/app/model/Category';
import Book from 'src/app/model/Book';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categoriesCollectionRef;

  constructor(
    private firestore: AngularFirestore,
    private libraryService: LibraryService) {
        this.categoriesCollectionRef = this.firestore.collection('categories');
    }

  async updateCategoryInBooks(category: Category) {
    const books =  await this.libraryService.getAllLibrary().toPromise();
    books.forEach(bookDoc => {
      let book:Book = bookDoc.data();
      if(book.categories != null && book.categories.length != 0){
        book.categories = book.categories.filter(bookCategory => (bookCategory.id !== category.id));
        book.categories.push(category);
        debugger;
        this.libraryService.editBook(book);
      }
    });
  }

  async deleteCategoryInBooks(uid: string) {
    const books =  await this.libraryService.getAllLibrary().toPromise();
    books.forEach(bookDoc => {
      let book:Book = bookDoc.data();
      if(book.categories != null && book.categories.length != 0){
        book.categories = book.categories.filter(category => (category.id !== uid));
        this.libraryService.editBook(book);
      }
    });
  }

  getAllCategories() {
    return this.categoriesCollectionRef.get();
  }

  editCategorie(category: Category){
    return this.firestore.doc('/categories/' + category.id).update(category);
  }

  deleteCategoryById(id: string) {
    const categorieRef = this.firestore.doc('/categories/' + id);
    categorieRef.delete();
  }

  addCategory(category: Category){
    const futureId = this.firestore.createId();
    category.id = futureId;
    return this.categoriesCollectionRef.doc(futureId).set(category);
  }
}
