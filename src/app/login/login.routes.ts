import { Routes } from '@angular/router';
import { LoginContainerComponent } from './containers/login/login.component';
import { SignupContainerComponent } from './containers/signup/signup.component';

export const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginContainerComponent,
    },
    {
        path: 'signup',
        component: SignupContainerComponent,
    },
];
