import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(
    private firestore: AngularFirestore) { }


  getAllCategories() {
    return this.firestore.collection('categories').get();
  }

  deleteCategoryById(id: string) {
    const categorieRef = this.firestore.doc('/categories/' + id);
    categorieRef.delete();
  }

  addCategory(book: any){
    return this.firestore.collection('categories').add(book);
  }
}
