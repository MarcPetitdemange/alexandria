import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPageRoutingModule } from './create-account-routing.module';

import { CreateAccountPage } from './create-account.page';
import { SelectPictureComponent } from 'src/app/component/shared/select-picture/select-picture.component';

@NgModule({
    declarations: [CreateAccountPage, SelectPictureComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateAccountPageRoutingModule,
        ReactiveFormsModule
    ]
})
export class CreateAccountPageModule {}
