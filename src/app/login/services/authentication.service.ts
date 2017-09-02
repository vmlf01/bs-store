import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebaseApp from 'firebase/app';

import { IUserProfile } from '../../../interfaces/IUserProfile';

@Injectable()
export class AuthenticationService {
    authProvider: firebaseApp.auth.Auth;

    constructor(
        private afAuth: AngularFireAuth,
    ) {
        this.authProvider = afAuth.auth;
    }

    getAuthState(): Observable<IUserProfile> {
        return this.afAuth.authState
            .map(this._mapAppUser);
    }

    login(email: string, password: string): Observable<IUserProfile> {
        return Observable.fromPromise(this.authProvider.signInWithEmailAndPassword(email, password))
            .map(this._mapAppUser);
    }

    loginWithFacebook(): Observable<IUserProfile> {
        return this._loginWithPopup(new firebaseApp.auth.FacebookAuthProvider());
    }

    loginWithGitHub(): Observable<IUserProfile> {
        return this._loginWithPopup(new firebaseApp.auth.GithubAuthProvider());
    }

    register(email: string, password: string, recaptcha: string): Observable<IUserProfile> {
        // TODO: validate reCaptcha

        return Observable.fromPromise(this.authProvider.createUserWithEmailAndPassword(email, password))
            .map(this._mapAppUser);
    }

    logout(): Observable<void> {
        return Observable.fromPromise(this.authProvider.signOut());
    }

    _loginWithPopup(provider: firebaseApp.auth.AuthProvider): Observable<IUserProfile> {
        return Observable.fromPromise(this.authProvider.signInWithPopup(provider))
            .map(result => result.user)
            .map(this._mapAppUser);
    }

    _mapAppUser(user: firebaseApp.User) {
        return user ?
            {
                email: user.email,
                name: user.displayName || user.email,
            } :
            null;
    }
}
