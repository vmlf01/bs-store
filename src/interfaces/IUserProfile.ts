import { IAddress } from './IAddress';

export type UserRoles = 'BUYER' | 'MANAGER' | 'ADMIN';

export interface IUserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
    role?: UserRoles;
    password?: string;
    shippingAddress?: IAddress;
    billingAddress?: IAddress;
}

export interface IProfileRoot {
    email: string;
    name: string;
    picture: string;
    shippingAddress?: IAddress;
    billingAddress?: IAddress;
    _sortName: string;
}

export interface IUserRoot {
    role?: UserRoles;
    isDeleted?: boolean;
}
