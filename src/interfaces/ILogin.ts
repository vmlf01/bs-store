export enum LoginProvider {
    EMail,
    Facebook,
    GitHub,
}

export interface ILogin {
    provider: LoginProvider;
    email?: string;
    password?: string;
    recaptcha?: string;
}
