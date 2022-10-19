import { AccountService } from './../../../services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: 'myAccount.page.html',
  styleUrls: ['myAccount.page.scss']
})
export class MyAccountPage implements OnInit {

  constructor(private router: Router, private ngFireAuth: AngularFireAuth, private accountService: AccountService) {}


  ngOnInit(): void {
    this.accountService.getCurrentUserInformations();
  }

  disconnect(){
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }

}
