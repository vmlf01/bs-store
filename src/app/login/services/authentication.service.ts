import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/fromPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebaseApp from 'firebase/app';

import { IUserProfile, UserRoles } from '../../../interfaces/IUserProfile';

@Injectable()
export class AuthenticationService {
    authProvider: firebaseApp.auth.Auth;

    constructor(
        private afAuth: AngularFireAuth,
        private afData: AngularFireDatabase,
    ) {
        this.authProvider = afAuth.auth;
    }

    getAuthState(): Observable<IUserProfile> {
        return this.afAuth.authState
            .switchMap(user => this._mapAppUser(user));
    }

    login(email: string, password: string): Observable<IUserProfile> {
        return Observable.fromPromise(this.authProvider.signInWithEmailAndPassword(email, password))
            .switchMap(user => this._mapAppUser(user));
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
            .switchMap(user => this._mapAppUser(user));
    }

    logout(): Observable<void> {
        return Observable.fromPromise(this.authProvider.signOut());
    }

    _loginWithPopup(provider: firebaseApp.auth.AuthProvider): Observable<IUserProfile> {
        return Observable.fromPromise(this.authProvider.signInWithPopup(provider))
            .map(result => result.user)
            .switchMap(user => this._mapAppUser(user));
    }

    _mapAppUser(user: firebaseApp.User): Observable<IUserProfile> {
        if (!user) {
            return null;
        }

        return this._getUserRole(user.uid)
            .map(userRole => {
                return {
                    email: user.email,
                    name: user.displayName || user.email,
                    picture: user.photoURL,
                    role: userRole,
                };
            });
    }

    _getUserRole(userId) {
        return this.afData.object(`/users/${userId}/role`)
            .take(1)
            .map(role => role.$exists() && role.$value || 'BUYER');
    }
}
