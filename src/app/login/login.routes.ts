import { Routes } from '@angular/router';
import { LoginContainerComponent } from './containers/login/login.component';
import { SignupContainerComponent } from './containers/signup/signup.component';
import { ProfileContainerComponent } from './containers/profile/profile.component';
import { PermissionAuthenticated } from '../app.permissions';
import { AuthorizationGuard } from './guards/authentication.guard';

export const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginContainerComponent,
    },
    {
        path: 'signup',
        component: SignupContainerComponent,
    },
    {
        path: 'profile',
        component: ProfileContainerComponent,
        canLoad: [AuthorizationGuard],
        canActivate: [AuthorizationGuard],
        data: { permission: PermissionAuthenticated },
    },
];
