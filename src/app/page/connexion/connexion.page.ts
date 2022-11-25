import { debug } from 'console';
import { AccountService } from './../../services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage  {

  credentials: FormGroup;
  error: any;
  valid:boolean = false;
  showLoader:boolean = false;

  constructor(public ngFireAuth: AngularFireAuth, private accountService: AccountService, private router: Router) {
    this.credentials = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async submit(){
    this.toogleLoader();
    const statut: any = await this.accountService.connect(this.credentials.value,this.error,this.valid);
    this.toogleLoader();
    this.error = statut.error;
    this.valid = statut.valid;
  }

  toogleLoader(): void {
    this.showLoader = !this.showLoader;
  }



}
