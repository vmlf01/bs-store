export type UserRoles = 'BUYER' | 'MANAGER' | 'ADMIN';

export interface IUserProfile {
    email: string;
    name: string;
    picture: string;
    role: UserRoles;
}
