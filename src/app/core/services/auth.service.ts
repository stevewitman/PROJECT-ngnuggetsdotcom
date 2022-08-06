import { Injectable } from '@angular/core';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

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
    private firestore: Firestore
  ) {
    this.userAuthState$ = authState(this.auth);
  }

  getUserAuthState() {
    return this.userAuthState$;
  }

  async signInWithGoogle() {
    const googleAuthProvider = new GoogleAuthProvider();
    const googleAuth = getAuth();
    await signInWithPopup(googleAuth, googleAuthProvider)
      .then((result) => {
        console.log('Signed in successfully');
        return this.updateUserData(result.user);
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
      photoUrl: user.photoURL
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
