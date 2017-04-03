import { Component, OnInit } from '@angular/core';
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
                    <input type="date">
                    <button class="btn" (click)="get()">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="col-md-2 navbar-right-panel">
                    <a class="btn btn-default" role="button">Вход</a>
                    <button class="btn btn-default" role="button">Регистрация</button>
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
            }
            .navbar-right-panel a {
                margin-left: 5px;
            }
            .main-part {
                padding-top: 70px;
                padding-left: 32px;   
                padding-right: 32px;
            }
            ul {
                list-style-type: none;
                padding-left: 0; 
            }
            .table {    
                margin-bottom: 0px;
            }            
            .search-result {
                border-color: #ddd;
                border-width: 1px;
                border-radius: 4px 4px 0 0;
                border-style: solid;    
            }
            span b {
                font-size: 23px;
            }
            .main-part span {
                display: block;
                margin-bottom: 5px;
                margin-left: 15px;
            }
        `]
})
export class AppComponent {
    items: Trip[] = [];
    from: string;
    to: string;
    fromDisplay: string;
    toDisplay: string;
    constructor( private httpService: HttpService ) { };
    get() {
        this.httpService.getTrips(this.from, this.to).then((arr) => {
            this.fromDisplay = this.from;
            this.toDisplay = this.to;
            this.items = arr;
        })        
    }
}