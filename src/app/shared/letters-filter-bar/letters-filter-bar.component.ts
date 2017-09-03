import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'bs-letters-filter-bar',
    template: `
        <div class="row">
            <div class="col-md-12">
                <div
                    *ngFor="let letter of filterLetters"
                    class="filter__chip"
                    (click)="onSelected.emit(letter)"
                >
                    <span
                        class="badge badge-secondary filter__letter"
                        [ngClass]="{ 'filter__letter--active': currentLetter === letter }"
                    >
                    {{ letter }}
                    </span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .filter__chip {
            font-size: 20px;
            display: inline-block;
        }

        .filter__letter {
            cursor: pointer;
            width: 25px;
            height: 25px;
            margin: 2px;
        }

        .filter__letter--active {
            background-color: #ED254E;
            color: #EEE;
        }
    `],
})
export class LettersFilterBarComponent implements OnInit, OnChanges {
    @Input() selectedLetter = '';
    @Output() onSelected = new EventEmitter<string>();

    filterLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    currentLetter = '';

    constructor() { }

    ngOnInit() {
        this._setCurrentLetter(this.selectedLetter);
    }

    ngOnChanges() {
        this._setCurrentLetter(this.selectedLetter);
    }

    _setCurrentLetter(letter) {
        this.currentLetter = letter && letter.toUpperCase();
    }
}
