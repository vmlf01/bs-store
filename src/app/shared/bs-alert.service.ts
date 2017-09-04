import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class BsAlertService {
    constructor() {}

    confirm(options) {
        const defaultOptions = {
            confirmButtonText: 'Confirm',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#FED766',
            showCancelButton: true,
            type: 'warning'
        };
        return swal({ ...defaultOptions, ...options });
    }

    alert(options) {
        const defaultOptions = {
            confirmButtonText: 'OK',
            type: 'info'
        };
        return swal({ ...defaultOptions, ...options });
    }

    question(options) {
        return this.alert({ type: 'question', ...options});
    }

    success(options) {
        return this.alert({ type: 'success', ...options});
    }

    warning(options) {
        return this.alert({ type: 'warning', ...options});
    }

    error(options) {
        return this.alert({ type: 'error', ...options});
    }

    info(options) {
        return this.alert({ type: 'info', ...options});
    }
}
