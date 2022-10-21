import { AccountService } from './../../services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  credentials: any = {};
  error: any;
  valid = false;

  constructor(public ngFireAuth: AngularFireAuth, private accountService:AccountService) { }

  ngOnInit() {
  }

  connect(){
    this.accountService.connect(this.credentials,this.error,this.valid);
  }


}