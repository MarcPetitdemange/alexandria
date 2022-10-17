import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: 'myAccount.page.html',
  styleUrls: ['myAccount.page.scss']
})
export class MyAccountPage {

  constructor(private router: Router) {}

  disconnect(){
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }

}
