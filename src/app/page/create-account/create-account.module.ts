import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPageRoutingModule } from './create-account-routing.module';

import { CreateAccountPage } from './create-account.page';
import { SharedComponentModule } from "../../component/shared-module/shared-component.module";

@NgModule({
    declarations: [CreateAccountPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateAccountPageRoutingModule,
        ReactiveFormsModule,
        SharedComponentModule
    ]
})
export class CreateAccountPageModule {}
