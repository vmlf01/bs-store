import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'bs-page-title',
    template: `
        <div class="row">
            <div class="col-md-12 mt-4">
                <h3>{{ title }}</h3>
                <hr>
            </div>
        </div>
    `,
    styles: []
})
export class PageTitleComponent implements OnInit {
    @Input() title = '';

    constructor() { }

    ngOnInit() {
    }

}
