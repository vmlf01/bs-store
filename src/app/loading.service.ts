import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    status = new BehaviorSubject<boolean>(false);
    private visible = false;

    constructor() { }

    show() {
        setTimeout(() => {
            if (!this.visible) {
                this.status.next(true);
                this.visible = true;
            }
        }, 0);
    }

    hide() {
        setTimeout(() => {
            if (this.visible) {
                this.status.next(false);
                this.visible = false;
            }
        }, 0);
    }
}
