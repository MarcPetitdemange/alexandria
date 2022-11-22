import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedComponentModule } from 'src/app/component/shared-module/shared-component.module';
import { CategoriesRoutingModule } from './categories-routing';
import { CategoriesPage } from './categories.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    SharedComponentModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
