import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from './models/trip';
import { HttpService } from './service/http.service';

@Component({
        selector: 'my-app',
        template: `
            <div class="top">
                <div class="header">
                    <div class="col-md-offset-2 col-md-8">
                        <a [routerLink]="['/']">Информаторий ЖД</a>
                    </div>
                <div class="col-xs-2 navbar-right-panel">
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
        `]
})
export class AppComponent { }