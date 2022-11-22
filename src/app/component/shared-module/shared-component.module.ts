import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelectPictureComponent } from 'src/app/component/shared/select-picture/select-picture.component';
import { CreateAccountPageRoutingModule } from 'src/app/page/create-account/create-account-routing.module';
import { AddBookComponent } from '../add-book/add-book.component';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';


@NgModule({
  declarations: [AddBookComponent, AddCategorieComponent, SelectPictureComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [AddBookComponent, AddCategorieComponent, SelectPictureComponent]
})
export class SharedComponentModule { }
