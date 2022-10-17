import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categorieRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase, private firestore: AngularFirestore) { }


  getAllCategories() {
    return this.firestore.collection('categories').snapshotChanges();
  }

  deleteCategoryById(id: string) {
    this.categorieRef = this.db.object('/categories/' + id);
    this.categorieRef.remove();
  }

  addCategory(book: any){
    this.firestore.collection('categories').add(book);
  }
}
