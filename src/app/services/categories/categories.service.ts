import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Category from 'src/app/model/Category';

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

  editCategorie(category: Category){
    return this.firestore.doc('/categories/' + category.$id).update(category);
  }

  deleteCategoryById(id: string) {
    const categorieRef = this.firestore.doc('/categories/' + id);
    categorieRef.delete();
  }

  addCategory(category: Category){
    return this.categoriesCollectionRef.add(category);
  }
}
