import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import * as firebaseApp from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { IUserProfile, UserRoles, IProfileRoot, IUserRoot } from '../../../interfaces/IUserProfile';
import { AppError } from '../../../interfaces/AppError';

const defaultUserRole: UserRoles = 'BUYER';

@Injectable()
export class AuthenticationService {
    authProvider: firebaseApp.auth.Auth;
    userProfile$ = new BehaviorSubject<firebaseApp.User>(null);

    constructor(
        private afAuth: AngularFireAuth,
        private afData: AngularFireDatabase,
    ) {
        this.authProvider = afAuth.auth;

        this.afAuth.authState.subscribe(authState => this.userProfile$.next(authState));
    }

    getAuthState(): Observable<IUserProfile> {
        return this.userProfile$
            .switchMap(user => this._initializeUserProfile(user).catch(() => Observable.of(null)));
    }

    reloadUserProfile(): void {
        this.userProfile$.next(this.userProfile$.getValue());
    }

    login(email: string, password: string): Observable<void> {
        return Observable.fromPromise(this.authProvider.signInWithEmailAndPassword(email, password))
            .switchMap(user => this._validateUserIsNotDeleted(user.uid).map(() => null));
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
            .switchMap(result => this._initializeUserProfile(result.user).map(() => null));
    }

    _validateUserIsNotDeleted(userId: string): Observable<IUserRoot> {
        return this._getUserRoot(userId)
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
        return this._validateUserIsNotDeleted(user.uid)
            .switchMap(userRoot => {
                return this._getProfileRoot(user.uid)
                    .switchMap(profileRoot => {
                        if (!profileRoot) {
                            return this._createUserProfile(user)
                                .switchMap(() => this._initializeUserProfile(user));
                        }

                        return Observable.of(this._mapUserProfile(user, profileRoot, userRoot));
                    });
            });
    }

    _createUserProfile(user: firebaseApp.User): Observable<void> {
        const profile = {
            '_sortName': user.displayName && user.displayName.toLowerCase() || user.email.toLowerCase(),
            name: user.displayName || user.email,
            email: user.email,
            picture: user.photoURL,
        };

        return Observable.fromPromise(
            this.afData.object(this._getProfileRef(user.uid))
                .set(profile)
        );
    }

    _mapUserProfile(user: firebase.User, profileRoot: IProfileRoot, userRoot: IUserRoot): IUserProfile {
        if (!user || !profileRoot) {
            return null;
        }

        return {
            id: user.uid,
            email: profileRoot.email || user.email,
            name: profileRoot.name || user.displayName || user.email,
            picture: profileRoot.picture || user.photoURL,
            role: userRoot.role || defaultUserRole,
            shippingAddress: profileRoot.shippingAddress,
            billingAddress: profileRoot.billingAddress,
        };
    }

    _getProfileRoot(userId: string): Observable<IProfileRoot> {
        return this.afData.object(this._getProfileRef(userId))
            .take(1)
            .map(result => result.$exists() && result);
    }

    _getUserRoot(userId: string): Observable<IUserRoot> {
        return this.afData.object(this._getUserRef(userId))
            .take(1)
            .map(result => result.$exists() && result);
    }

    _getUserRef(userId: string): string {
        return `/users/${userId}`;
    }

    _getProfileRef(userId: string): string {
        return `${this._getProfilesRef()}/${userId}`;
    }

    _getProfilesRef(): string {
        return `/profiles`;
    }
}
