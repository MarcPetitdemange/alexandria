import { CategoriesService } from './../../../services/categories/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit {

  allCategories: any[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((value) => {
      this.allCategories = value.docs.map(doc => doc.data());
    });
  }

  addBook(): void {
    this.categoriesService.addCategory({
      title: "Test",
      description: "Test description"
    });
  }

}
