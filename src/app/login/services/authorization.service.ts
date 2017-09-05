import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IPermissions, IRolePermissions } from './IPermissions';

@Injectable()
export class AuthorizationService {
    userRole: string;
    permissionsList: IRolePermissions;

    constructor(permissions: IPermissions) {
        permissions.getUserRole()
            .subscribe(role => this.userRole = role);

        this.permissionsList = permissions.getPermissionsList();
    }

    hasPermissionTo(permission: string): boolean {
        return this.userRole && this.permissionsList[this.userRole] &&
            this.permissionsList[this.userRole].indexOf(permission) !== -1 || false;
    }

    getPermissions(path: string): string[] {
        return this.userRole && this.permissionsList[this.userRole] &&
            this.permissionsList[this.userRole].filter(permission => permission.startsWith(path)) || [];
    }
}
