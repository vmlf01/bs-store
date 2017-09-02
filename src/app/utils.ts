import { RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterState, RouterStateSnapshot, Data } from '@angular/router';

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
    data: Data;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        return {
            url: routerState.url,
            queryParams: routerState.root.queryParams,
            params: routerState.root.params,
            data: routerState.root.data,
        };
    }
}
