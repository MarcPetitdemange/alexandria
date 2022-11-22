import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyAccountPage } from './myAccount.page';

import { MyAccountRoutingModule } from './myAccount-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MyAccountPage }]),
    MyAccountRoutingModule,
  ],
  declarations: [MyAccountPage]
})
export class MyAccountPageModule {}
