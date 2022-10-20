import { AddCategorieComponent } from './../../../component/add-categorie/add-categorie.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesPage } from './categories.page';
import { CategoriesRoutingModule } from './categories-routing';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CategoriesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriesPage, AddCategorieComponent]
})
export class CategoriesPageModule {}
