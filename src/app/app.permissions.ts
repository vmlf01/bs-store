import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IPermissions, IRolePermissions } from './login/services/IPermissions';
import { IAppStore } from './app.store';
import { selectUserProfile } from './login/login.store';

export const PermissionCatalogAccess = 'permission.catalog.access';
export const PermissionCatalogAddProduct = 'permission.catalog.product.add';
export const PermissionCatalogEditProduct = 'permission.catalog.product.edit';
export const PermissionCatalogDeleteProduct = 'permission.catalog.product.delete';

const appPermissions: IRolePermissions = {
    'ADMIN': [
        PermissionCatalogAccess,
        PermissionCatalogAddProduct,
        PermissionCatalogEditProduct,
        PermissionCatalogDeleteProduct,
    ],
    'MANAGER': [
        PermissionCatalogAccess,
        PermissionCatalogAddProduct,
        PermissionCatalogEditProduct,
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
