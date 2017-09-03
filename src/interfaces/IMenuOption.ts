export enum UserMenuOptions {
    MyProfile,
    MyOrders,
    Users,
    Products,
    Orders,
    Logout,
}

export interface IMenuOption {
    id: UserMenuOptions;
    label: string;
}
