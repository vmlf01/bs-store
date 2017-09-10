import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IPermissions, IRolePermissions } from './login/services/IPermissions';
import { IAppStore } from './app.store';
import { selectUserProfile } from './login/login.store';

export const PermissionAuthenticated = 'permission.authenticated';

export const PermissionCatalogAccess = 'permission.catalog.access';
export const PermissionCatalogAddProduct = 'permission.catalog.product.add';
export const PermissionCatalogEditProduct = 'permission.catalog.product.edit';
export const PermissionCatalogDeleteProduct = 'permission.catalog.product.delete';

export const PermissionUsersAccess = 'permission.users.access';
export const PermissionAddUser = 'permission.users.add';
export const PermissionEditUser = 'permission.users.edit';
export const PermissionDeleteUser = 'permission.users.delete';

export const PermissionOrdersAccess = 'permission.orders.access';
export const PermissionOrderChangeStatus = 'permission.orders.change-status';
export const PermissionDeleteOrder = 'permission.orders.delete';

const appPermissions: IRolePermissions = {
    'ADMIN': [
        PermissionAuthenticated,

        PermissionCatalogAccess,
        PermissionCatalogAddProduct,
        PermissionCatalogEditProduct,
        PermissionCatalogDeleteProduct,

        PermissionUsersAccess,
        PermissionAddUser,
        PermissionEditUser,
        PermissionDeleteUser,

        PermissionOrdersAccess,
        PermissionDeleteOrder,
    ],
    'MANAGER': [
        PermissionAuthenticated,

        PermissionCatalogAccess,
        PermissionCatalogAddProduct,
        PermissionCatalogEditProduct,

        PermissionOrdersAccess,
        PermissionOrderChangeStatus,
    ],
    'BUYER': [
        PermissionAuthenticated,
    ],
};

@Injectable()
export class AppPermissions extends IPermissions {
    constructor(private store: Store<IAppStore>) {
        super();
    }

    getUserRole(): Observable<string> {
        return this.store.select(selectUserProfile)
            .map(user => user && user.role);
    }

    getPermissionsList(): IRolePermissions {
        return appPermissions;
    }
}
