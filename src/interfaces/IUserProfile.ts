export type UserRoles = 'BUYER' | 'MANAGER' | 'ADMIN';

export interface IUserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
    role?: UserRoles;
}

export interface IProfileRoot {
    email: string;
    name: string;
    picture: string;
    _sortName: string;
}

export interface IUserRoot {
    role?: UserRoles;
    isDeleted?: boolean;
}
