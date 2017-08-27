import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'bs-loading-indicator',
    template: `
        <div *ngIf="visible" class="loading">
            <div class="loading-indicator">
                <img src="assets/bs-store-icon-128.png">
            </div>
        </div>
    `,
    styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
    @Input() visible: boolean;

    constructor() { }

    ngOnInit() {
    }
}
