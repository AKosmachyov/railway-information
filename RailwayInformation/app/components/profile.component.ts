import { Component, OnInit } from '@angular/core';

import { HttpService } from '../service/http.service';
import { AuthService } from '../service/auth.service';

import { Ticket } from '../models/ticket';

@Component({
    selector: 'profile',
    template: `
            <span><b>Личный кабинет</b></span>          
            <div *ngIf="arr.length > 0" class="search-field">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Поезд</th>
                            <th>Отправление</th>
                            <th>Прибытие</th>
                            <th>Вагон</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="ticket" *ngFor="let item of arr" [ticket]="item"></tr>
                    </tbody>
                </table>
            </div>
            <img *ngIf="isWaiting" src="/public/images/spinner.gif">
            <div *ngIf="arr.length == 0 && !isWaiting && !dispalayError" class="alert alert-info" role="alert">У вас нет купленных билетов</div>
            <div *ngIf="dispalayError" class="alert alert-warning" role="alert">{{errorMessage}}</div>
        `,
    styles: [`
            .table {    
                margin-bottom: 0px;
            }
            th {
                text-align: center;
            }        
            .search-field {
                min-width: 465px;
                border-color: #ddd;
                border-width: 1px;
                border-radius: 4px 4px 0 0;
                border-style: solid;    
            }           
            img {
                position: absolute;
                top: 50%;
                left: 50%;
                height: 100px;
                text-align: center;
            }
        `]
})
export class ProfileComponent implements OnInit {
    arr: Ticket[] = [];
    isWaiting: boolean = false;
    dispalayError: boolean = false;
    errorMessage: string = "Произошла ошибка";
    constructor(
        private httpService: HttpService,
        private authService: AuthService
    ) { };

    ngOnInit() {
        this.isWaiting = true;
        if (!this.authService.currentUser) {
            this.dispalayError = true;
            this.errorMessage = "Вы не авторизованы";
            return;
        }
        this.httpService.getTickets()
            .then(arr => {
                this.isWaiting = false;
                this.arr = arr;
            })
            .catch(() => {
                this.isWaiting = false;
                this.dispalayError = true;
            })
    }
}