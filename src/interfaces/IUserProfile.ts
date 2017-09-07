export type UserRoles = 'BUYER' | 'MANAGER' | 'ADMIN';

export interface IUserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
    role?: UserRoles;
}

export interface IUserProfileRoot {
    role?: UserRoles;
    profile: {
        id: string;
        email: string;
        name: string;
        picture: string;
        _sortName: string;
    };
    isDeleted?: boolean;
}
