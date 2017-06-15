import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { Trip } from '../models/trip';

import { AuthService } from '../service/auth.service';

@Component({
    selector: 'my-app',
    template: `
            <div class="top">
                <div class="header">
                    <div class="col-md-offset-2 col-md-8">
                        <a [routerLink]="['/']">Информаторий ЖД</a>
                    </div>
                <div class="col-xs-2 navbar-right-panel">
                    <div *ngIf = "!user">
                        <a class="btn btn-default" [routerLink]="['/login']">Вход</a>
                        <a class="btn btn-default" [routerLink]="['/checkin']">Регистрация</a>
                    </div>
                    <div *ngIf = "!!user">
                        <span>{{user.email}}</span>
                    </div>
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
export class AppComponent implements DoCheck {
    private user: User;
    constructor(private authService: AuthService) {
        this.user = authService.currentUser;
    }
    ngDoCheck() {
        this.user = this.authService.currentUser;
    }
}