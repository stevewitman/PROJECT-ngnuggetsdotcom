import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { map, Observable, of } from 'rxjs';

import {
  Auth,
  User,
  getAuth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userAuthState$: Observable<User | null> = of(null);

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.userAuthState$ = authState(this.auth);
  }

  getUserAuthState() {
    return this.userAuthState$;
  }

  get isAdmin(): Observable<boolean> {
    return this.userAuthState$.pipe(
      map((user) => {
        if (user?.email === 'stevewitman@gmail.com') {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  async signInWithGoogle() {
    const googleAuthProvider = new GoogleAuthProvider();
    const googleAuth = getAuth();
    await signInWithPopup(googleAuth, googleAuthProvider)
      .then((result) => {
        console.log('Signed in successfully');
        this.updateUserData(result.user);
        return this.router.navigate(['/admin']);
      })
      .catch((error) => {
        console.log('ERROR while signing in:', error);
      });
  }

  async updateUserData(user: User) {
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL,
    };
    const userRef = doc(this.firestore, `users/${user.uid}`);
    return await setDoc(userRef, data, { merge: true });
  }

  async signOutWithGoogle() {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log('ERROR while signing out:', error);
      });
  }
}
