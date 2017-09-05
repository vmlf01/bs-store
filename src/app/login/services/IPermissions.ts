import { Injectable, OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface IRolePermissions {
    [role: string]: string[];
}

export abstract class IPermissions {
    abstract getUserRole(): Observable<string>;

    abstract getPermissionsList(): IRolePermissions;
}
