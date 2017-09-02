export enum UserMenuOptions {
    Profile,
    Logout,
}

export interface IMenuOption {
    id: UserMenuOptions;
    label: string;
}
