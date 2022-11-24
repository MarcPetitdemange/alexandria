import { LibraryService } from './../../../services/library/library.service';
import { CategoriesService } from './../../../services/categories/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapUtils } from 'src/app/model/utils/MapUtils';
import { AlertController } from '@ionic/angular';
import { AddCategorieComponent } from 'src/app/component/add-categorie/add-categorie.component';
import { FormControl, FormGroup } from '@angular/forms';
import { debug } from 'console';
import Category from 'src/app/model/Category';
import Book from 'src/app/model/Book';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {

  @ViewChild(AddCategorieComponent) modalCategory: AddCategorieComponent;

  allCategories: any[];

  constructor(private categoriesService: CategoriesService, private libraryService: LibraryService, private alertController: AlertController) {}

  ngOnInit(): void {
    this.refreshCategoriesList();
  }

  refreshCategoriesList(){
    this.categoriesService.getAllCategories().subscribe((value) => {
      this.allCategories = MapUtils.mapBook(value);
      this.allCategories = this.allCategories.sort(Category.sortCriteria);
    });
  }

  editCategory(category: any){
    debugger;
    this.modalCategory.editMode = true;
    this.modalCategory.toggleOpen();

    this.modalCategory.category.patchValue({
      id: category.id,
      title: category.title,
      description: category.description,
      color: category.color
    });
  }

  async deleteCategorie(uid: string) {
    const alert = await this.alertController.create({
      header: 'Warning !',
      message: 'You\'re going to delete this category.<br> Do you want to continue ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            this.categoriesService.deleteCategoryById(uid);
            this.categoriesService.deleteCategoryInBooks(uid);
            this.refreshCategoriesList();
          },
        },
      ],
    });
    await alert.present();
  }
}
