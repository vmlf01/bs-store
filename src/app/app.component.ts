import { LoadingService } from './loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Buy Something';
    showLoader = false;

    constructor(private loadingService: LoadingService) {
    }

    ngOnInit() {
        this.loadingService.status
            .subscribe(visible => {
                this.showLoader = visible;
            });
    }
}
