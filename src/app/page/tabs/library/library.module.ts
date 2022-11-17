import { SelectPictureComponent } from 'src/app/component/shared/select-picture/select-picture.component';
import { AddBookComponent } from './../../../component/add-book/add-book.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryPage } from './library.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LibraryRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LibraryPage, AddBookComponent, SelectPictureComponent]
})
export class LibraryPageModule {}
