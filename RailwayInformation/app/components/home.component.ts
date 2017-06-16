import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { Trip } from '../models/trip';
import { HttpService } from '../service/http.service';

@Component({
    selector: 'home',
    template: `
            <div class="col-md-offset-2 col-md-8">
                <h1>Поиск</h1>
                <div>Откуда
                        <input type="text" id="from" [(ngModel)]="from">
                        Куда
                        <input type="text" id="to" [(ngModel)]="to">
                        Когда
                        <input type="date" [(ngModel)]="time">
                        <button class="btn" (click)="get()">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button>
                </div>
            </div>
    `,
    styles: [`
            input[type="date"] {                
                padding: 5px 12px;
            }
            input {
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 6px 12px;
            }
            input + button {
                background-color: transparent;
                font-size: 17px;
                color: #aeb7bf;
                outline: none;    
            }
            h1 + div {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            h1 {
                text-align: center;
            }
    `]
})
export class HomeComponent {
    from: string;
    to: string;
    time: Date;
    constructor(
        private router: Router
    ) { };
    get() {
        if (!this.from || !this.to || !this.time)
            return;
        this.router.navigate(['/search'], {
            queryParams: {
                from: this.from,
                to: this.to,
                time: this.time

            }
        })
    } 
}