import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

/* adding interfaces*/
interface AuthResponse {
  status: string;
  success: string;
  token: string;

}

interface JWTResponse {
  status: string; 
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: Observable<firebase.User>;
  private currentUser: firebase.User= null

  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
    }


    getAuthState() {
      return this.authState;
    }



  
  



  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }


  public updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/browse']);
    });
  }

  /*sstarts here*/
  logIn(user: any) {
    this.afAuth.auth.signInWithEmailAndPassword(user.username, user.password)
    .then(res => console.log(res))
    .catch(function(error) {
      // Handle Errors here.
    });
  }
}