import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/zip';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebaseApp from 'firebase/app';

import { IUserProfile, UserRoles, IProfileRoot, IUserRoot } from '../../../interfaces/IUserProfile';
import { AppError } from '../../../interfaces/AppError';

const defaultUserRole: UserRoles = 'BUYER';

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
            .map(users => users.map(profile => this._mapUserProfile(profile, {})));
    }

    getUserDetails(userId: string): Observable<IUserProfile> {
        return Observable.zip(
            this._getProfileRoot(userId),
            this._getUserRoot(userId),
        )
            .map(([profileRoot, userRoot]) => this._mapUserProfile(profileRoot, userRoot));
    }

    saveUser(user: IUserProfile): Observable<string> {
        return null;
        // user = { ...user };

        // if (!user.id) {
        //     // create a new object
        //     const newRef = this.afData.list('/users').push({});
        //     user.id = newRef.key;
        // }

        // // set property for filtering index
        // user['_sortName'] = user.name.toLowerCase();

        // return Observable.fromPromise(this.afData.object(this._getUserRef(user.id)).set(user))
        //     .map(() => user.id);
    }

    deleteUser(userId: string): Observable<void> {
        return null;
        // if (!userId) {
        //     throw new AppError('INVALID_ARGS', 'Invalid userId provided');
        // }

        // return Observable.fromPromise(this.afData.list('/users').remove(userId));
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
