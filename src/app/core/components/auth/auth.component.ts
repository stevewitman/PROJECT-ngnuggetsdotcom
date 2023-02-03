import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { User } from '@angular/fire/auth';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  userAuthStatus$: Observable<User | null> = of(null);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userAuthStatus$ = this.authService.userAuthState$;
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then((res) => {
        // Sign-in successful.
        console.log('AUTH COMPONENT: Signed In With Google');
      })
      .catch((error) => {
        // An error happened.
        // console.log(
        //   'AUTH COMPONENT: ERROR occurred while Signing In With Google...'
        // );
        // console.log('AUTH COMPONENT: ERROR message:', error);
      });
  }

  signOutWithGoogle() {
    this.authService
      .signOutWithGoogle()
      .then(() => {
        this.router.navigate(['']);
        // Sign-out successful.
        console.log('AUTH COMPONENT: Signed Out With Google');
      })
      .catch((error) => {
        // An error happened.
        // console.log(
        //   'AUTH COMPONENT: ERROR occurred while Signing Out With Google'
        // );
        // console.log('AUTH COMPONENT: ERROR message:', error);
      });
  }
}
