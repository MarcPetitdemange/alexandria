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

  constructor(private router: Router, public ngFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  connect(){
    this.ngFireAuth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password).then(value => {
      this.router.navigateByUrl('/tabs', { replaceUrl:true });
    }).catch(error => {
      this.error = error;
    });
  }
}
