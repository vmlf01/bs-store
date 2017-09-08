import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppSharedModule } from '../shared/shared.module';
import { routes } from './users.routes';
import { IUsersStore, usersFeatureName, reducers, initialState } from './users.store';
import { usersEffects } from './users.effects';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UsersService } from './services/users.service';
import { UsersModalComponent } from './containers/users-modal/users-modal.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature<IUsersStore>(usersFeatureName, reducers, { initialState }),
        EffectsModule.forFeature(usersEffects),
        AngularFireDatabaseModule,
        NgbModule,
        NgxDatatableModule,
        AppSharedModule,
    ],
    declarations: [
        UsersListComponent,
        UsersModalComponent,
        UsersEditComponent,
    ],
    entryComponents: [
        UsersModalComponent,
    ],
    exports: [
    ],
    providers: [
        UsersService,
    ],
})
export class AppUsersModule { }
