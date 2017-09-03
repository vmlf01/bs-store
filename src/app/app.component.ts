import { IMenuOption, UserMenuOptions } from '../interfaces/IMenuOption';
import { selectUserProfile, selectIsAuthenticated } from './login/login.store';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { LoadingService } from './shared/loading.service';
import { IAppStore } from './app.store';
import { selectCartCount } from './shop/shop.store';
import { selectMenuOptions } from './state/reducers/app.reducer';
import { Logout } from './login/state/actions/login.actions';
import { UserMenuOptionSelected } from './state/actions/app.actions';

@Component({
    selector: 'bs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Buy Something';
    itemCount = 0;
    isAdminPage = false;
    isAuthenticated = false;
    profile = null;
    menuOptions: IMenuOption[] = [];
    showLoader = false;

    private shopSubscriptions: Subscription[];

    constructor(
        private loadingService: LoadingService,
        private store: Store<IAppStore>,
    ) {
    }

    ngOnInit() {
        this.loadingService.status
            .subscribe(visible => this.showLoader = visible);

        this.store.select(selectUserProfile)
            .subscribe(user => this.profile = user);

        this.store.select(selectIsAuthenticated)
            .subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);

        this.store.select(selectMenuOptions)
            .subscribe(options => this.menuOptions = options);

        this.store.select(state => state.app.isAdminPage)
            .subscribe(result => {
                this.isAdminPage = result;
                if (!this.isAdminPage) {
                    this.unregisterAdminSubscriptions();
                    this.initializeShopSubscriptions();
                } else {
                    this.unregisterShopSubscriptions();
                    this.initializeAdminSubscriptions();
                }
            });
    }

    initializeShopSubscriptions() {
        this.shopSubscriptions = [
            this.store.select(selectCartCount)
                .subscribe(count => this.itemCount = count),
        ];
    }

    unregisterShopSubscriptions() {
        this.shopSubscriptions
            .forEach(subscription => subscription.unsubscribe());
        this.shopSubscriptions = [];
    }

    initializeAdminSubscriptions() {

    }

    unregisterAdminSubscriptions() {

    }

    handleMenuOptionSelected(menuOption: IMenuOption) {
        this.store.dispatch(new UserMenuOptionSelected(menuOption));
    }
}
