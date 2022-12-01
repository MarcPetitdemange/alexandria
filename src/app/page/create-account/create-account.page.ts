import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from './../../services/account/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  showLoader: boolean = false;
  error: any;
  valid:boolean = false;
  credentialsForm: FormGroup;

  constructor(public ngFireAuth: AngularFireAuth,
     private firestorage: AngularFireStorage,
     private firestore: AngularFirestore,
     private accountService: AccountService) {}

  ngOnInit(): void {
    this.credentialsForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      photo: new FormControl(null)
    });
  }

  async submit(){
    this.toogleLoader();
    const statut: any = await this.accountService.createUserAccount(this.credentialsForm.value);
    this.toogleLoader();
    this.error = statut.error;
    this.valid = statut.valid;
  }

  toogleLoader(): void {
    this.showLoader = !this.showLoader;
  }

  cancel(){
    this.credentialsForm.reset();
  }
}
