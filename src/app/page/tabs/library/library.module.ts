import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryPage } from './library.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LibraryRoutingModule
  ],
  declarations: [LibraryPage]
})
export class LibraryPageModule {}
