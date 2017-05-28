import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from './models/trip';
import { HttpService } from './service/http.service';

@Component({
        selector: 'my-app',
        template: `
            <div class="top">
                <div class="header">
                    <div class="col-md-2">
                        Информаторий ЖД
                    </div>
                <div class="col-md-8">
                    Откуда
                    <input type="text" id="from" [(ngModel)]="from">
                    Куда
                    <input type="text" id="to" [(ngModel)]="to">
                    Когда
                    <input type="date" value="2017-05-01" min='2017-05-01' max='2017-05-31' [(ngModel)]="time">
                    <button class="btn" (click)="get()">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="col-md-2 navbar-right-panel">
                    <button class="btn btn-default">Вход</button>                     
                </div>
            </div>
        </div>       
        <div class="main-part">
            <router-outlet></router-outlet>           
        </div>`,
        styles: [` 
            .top {
               height: 60px;
               position: fixed;
                width: 100%;
                border-bottom: 1px solid #d5dddf;
            }
            .header {
                display: flex;
                background-color: white;
                height: 100%;
                align-items: center;
                margin-left: 32px;
                margin-right: 32px;
            }
            .navbar-right-panel {
                display: flex;
                justify-content: center;
            }
            .navbar-right-panel button {
                border-color: #7aa1bd;
                padding-left: 15px;
                padding-right: 15px;
                color: #548eaa;
            }
            .navbar-right-panel button:hover {
                background-color: #7aa1bd;
                color:white;
            }
            .main-part {
                padding-top: 70px;
                padding-left: 32px;   
                padding-right: 32px;
            }
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
        `]
})
export class AppComponent {
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