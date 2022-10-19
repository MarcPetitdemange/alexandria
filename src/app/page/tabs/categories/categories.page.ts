import { CategoriesService } from './../../../services/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import { MapUtils } from 'src/app/model/MapUtils';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {

  allCategories: any[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.refreshCategoriesList();
  }

  refreshCategoriesList(){
    this.categoriesService.getAllCategories().subscribe((value) => {
      this.allCategories = MapUtils.mapBook(value);
    });
  }

  addCategorie(): void {
    this.categoriesService.addCategory({
      title: "Test",
      description: "Test description"
    });
  }

  deleteCategorie(uid: string) {
    this.categoriesService.deleteCategoryById(uid);
    this.refreshCategoriesList();
  }

}
