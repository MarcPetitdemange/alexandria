import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LibraryPage } from './library.page';

import { SharedComponentModule } from 'src/app/component/shared-module/shared-component.module';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
    declarations: [LibraryPage],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        LibraryRoutingModule,
        ReactiveFormsModule,
        SharedComponentModule
    ]
})
export class LibraryPageModule {}
