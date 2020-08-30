import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/store/actions/auth.actions';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  _user: User;

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState>) { }

  get user() {
    return {... this._user};
  }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      if ( fuser ) {
        // existe
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = User.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({user}));
          });

      } else {
        // no existe
        this.userSubscription?.unsubscribe();
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
      }

    });

  }


  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser = new User(user.uid, name, user.email);
        return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
