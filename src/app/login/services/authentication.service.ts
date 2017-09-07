import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import * as firebaseApp from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { IUserProfile, UserRoles, IUserProfileRoot } from '../../../interfaces/IUserProfile';
import { AppError } from '../../../interfaces/AppError';

const defaultUserRole: UserRoles = 'BUYER';

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
            .switchMap(user => this._initializeUserProfile(user).catch(() => Observable.of(null)));
    }

    login(email: string, password: string): Observable<void> {
        return Observable.fromPromise(this.authProvider.signInWithEmailAndPassword(email, password))
            .switchMap(user => this._validateUserIsNotDeleted(user).map(() => null));
    }

    loginWithFacebook(): Observable<void> {
        return this._loginWithPopup(new firebaseApp.auth.FacebookAuthProvider());
    }

    loginWithGitHub(): Observable<void> {
        return this._loginWithPopup(new firebaseApp.auth.GithubAuthProvider());
    }

    register(email: string, password: string, recaptcha: string): Observable<void> {
        // TODO: validate reCaptcha

        return Observable.fromPromise(this.authProvider.createUserWithEmailAndPassword(email, password))
            .switchMap(user => this._createUserProfile(user));
    }

    logout(): Observable<void> {
        return Observable.fromPromise(this.authProvider.signOut());
    }

    _loginWithPopup(provider: firebaseApp.auth.AuthProvider): Observable<void> {
        return Observable.fromPromise(this.authProvider.signInWithPopup(provider))
            .switchMap(result => this._validateUserIsNotDeleted(result.user).map(() => null));
    }

    _validateUserIsNotDeleted(user: firebase.User): Observable<IUserProfileRoot> {
        return this._getUserRoot(user.uid)
            .switchMap(userRoot => {
                if (userRoot && userRoot.isDeleted) {
                    this.logout();
                    return Observable.throw(new AppError('USER_NOT_ALLOWED', 'User account has been suspended'));
                }
                return Observable.of(userRoot);
            });
    }

    _initializeUserProfile(user: firebase.User): Observable<IUserProfile> {
        if (!user) {
            return Observable.of(null);
        }
        return this._validateUserIsNotDeleted(user)
            .switchMap(userRoot => {
                if (!userRoot) {
                    return this._createUserProfile(user)
                        .switchMap(() => this._initializeUserProfile(user));
                }

                return Observable.of(this._getUserProfile(user, userRoot));
            });
    }

    _createUserProfile(user: firebaseApp.User): Observable<void> {
        const profile = {
            id: user.uid,
            '_sortName': user.displayName && user.displayName.toLowerCase() || user.email.toLowerCase(),
            name: user.displayName || user.email,
            email: user.email,
            picture: user.photoURL,
            role: defaultUserRole,
        };

        return Observable.fromPromise(
            this.afData.object(this._getProfileRef(profile.id))
                .set(profile)
        );
    }

    _getUserProfile(user: firebase.User, userRoot: IUserProfileRoot): IUserProfile {
        if (!user || !userRoot) {
            return null;
        }

        return {
            id: user.uid,
            email: userRoot.profile && userRoot.profile.email || user.email,
            name: userRoot.profile && userRoot.profile.name || user.displayName || user.email,
            picture: userRoot.profile && userRoot.profile.picture || user.photoURL,
            role: userRoot.role || defaultUserRole,
        };
    }

    _getUserRoot(userId: string): Observable<IUserProfileRoot> {
        return this.afData.object(this._getUserRef(userId))
            .take(1);
    }

    _getProfileRef(userId: string): string {
        return `${this._getUserRef(userId)}/profile`;
    }

    _getUserRef(userId: string): string {
        return `/users/${userId}`;
    }
}
