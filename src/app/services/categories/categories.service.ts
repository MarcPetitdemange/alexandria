import { MapUtils } from 'src/app/model/MapUtils';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categoriesCollectionRef;

  constructor(
    private firestore: AngularFirestore) {
        this.categoriesCollectionRef = this.firestore.collection('categories');
    }


  getAllCategories() {
    return this.categoriesCollectionRef.get();
  }

  editCategorie(category){
    return this.firestore.doc('/categories/' + category.id).update(category);
  }

  deleteCategoryById(id: string) {
    const categorieRef = this.firestore.doc('/categories/' + id);
    categorieRef.delete();
  }

  addCategory(book: any){
    return this.categoriesCollectionRef.add(book);
  }
}
