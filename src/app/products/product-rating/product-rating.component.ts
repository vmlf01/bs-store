import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'bs-product-rating',
    template: `
        <span class="text-warning">
            {{ ratingString }}
        </span> {{ rating | number:'1.1'}} stars
    `,
    styles: []
})
export class ProductRatingComponent implements OnInit, OnChanges {
    @Input() rating: number;

    ratingString: string;

    constructor() { }

    ngOnInit() {
        this.initRating(this.rating);
    }

    ngOnChanges() {
        this.initRating(this.rating);
    }

    private initRating(rating) {
        this.ratingString = Array.from(Array(5).keys())
            .map(value => (value + 1) <= this.rating ? '★' : '☆')
            .join('');
    }
}
