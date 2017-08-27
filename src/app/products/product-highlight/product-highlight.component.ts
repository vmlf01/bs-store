import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bs-product-highlight',
    template: `
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
                </div>
                <div class="col-md-6">
                    <h4 class="card-title">
                        <a href="#">Item One</a>
                    </h4>
                    <h5>$24.99</h5>

                    <hr class="my-4">

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                    <p class="lead">
                        <a class="btn btn-primary btn-lg" href="#" role="button">Buy Now</a>
                    </p>
                </div>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class ProductHighlightComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
