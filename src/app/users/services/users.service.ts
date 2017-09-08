import { UserDropdownComponent } from '../../shared/user-dropdown/user-dropdown.component';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/forkJoin';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebaseApp from 'firebase/app';

import { IUserProfile, UserRoles, IProfileRoot, IUserRoot } from '../../../interfaces/IUserProfile';
import { AppError } from '../../../interfaces/AppError';
import { FirebaseAppConfig } from 'angularfire2';

const defaultUserRole: UserRoles = 'BUYER';

import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {
    constructor(
        private afData: AngularFireDatabase,
    ) {
    }

    getUsers(startingLetter: string): Observable<IUserProfile[]> {
        const query = {
            orderByChild: '_sortName',
            startAt: startingLetter.toLowerCase(),
            endAt: `${startingLetter.toLowerCase()}\uf8ff`,
        };

        return this.afData.list('/profiles', { query })
            .switchMap((users: IProfileRoot[]) => {
                if (users.length === 0) {
                    return Observable.of([]);
                }

                return Observable.forkJoin(
                    users.map(profileRoot =>
                        this._getUserRoot(profileRoot['$key'])
                            .map(userRoot => this._mapUserProfile(profileRoot, userRoot))
                    )
                );
            });
    }

    getUserDetails(userId: string): Observable<IUserProfile> {
        return Observable.zip(
            this._getProfileRoot(userId),
            this._getUserRoot(userId),
        )
            .map(([profileRoot, userRoot]) => this._mapUserProfile(profileRoot, userRoot));
    }

    saveUser(user: IUserProfile): Observable<string> {
        let saveUser$ = Observable.of(user.id);

        if (!user.id) {
            saveUser$ = this._createNewUser(user);
        }

        return saveUser$.switchMap(userId => {
            const userRoot = {
                role: user.role,
            };

            const profileRoot = {
                name: user.name,
                email: user.email,
                picture: user.picture,
                _sortName: user.name.toLowerCase(),
                lastUpdate: new Date().toISOString(),
            };

            const updates = {
                [`/users/${userId}`]: userRoot,
                [`/profiles/${userId}`]: profileRoot,
            };

            return Observable.fromPromise(this.afData.object('/').update(updates))
                .map(() => userId);
        });
    }

    _createNewUser(user: IUserProfile) {
        // create a new firebase auth user
        const adminApp = firebaseApp.initializeApp(environment.firebase.config, 'admin');
        adminApp.auth().setPersistence(firebaseApp.auth.Auth.Persistence.NONE);
        return Observable.fromPromise(adminApp.auth().createUserWithEmailAndPassword(user.email, user.password))
            .map(result => result.uid)
            .finally(() => adminApp.delete());
    }

    deleteUser(userId: string): Observable<void> {
        if (!userId) {
            return Observable.throw(new AppError('INVALID_ARGS', 'Invalid userId provided'));
        }

        return Observable.forkJoin(
            this.afData.object(`/users/${userId}`).update({ isDeleted: true }),
            this.afData.object(`/profiles/${userId}`).remove(),
        ).map(() => null);
    }

    getNewBlankUser(): IUserProfile {
        return {
            id: null,
            name: '',
            email: '',
            role: 'BUYER',
            picture: '',
        };
    }

    _mapUserProfile(profileRoot: IProfileRoot, userRoot: IUserRoot): IUserProfile {
        if (!profileRoot) {
            return null;
        }

        return {
            id: profileRoot['$key'],
            email: profileRoot.email,
            name: profileRoot.name,
            picture: profileRoot.picture,
            role: userRoot.role || defaultUserRole,
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
