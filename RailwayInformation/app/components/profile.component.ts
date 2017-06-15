import { Component, OnInit } from '@angular/core';

import { HttpService } from '../service/http.service';

import { Ticket } from '../models/ticket';

@Component({
    selector: 'profile',
    template: `           
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
            <div *ngIf="arr.length == 0 && !isWaiting" class="alert alert-info" role="alert">У вас нет купленных билетов</div>
            <div *ngIf="dispalayError" class="alert alert-warning" role="alert">Произошла ошибка</div>
        `,
    styles: [`
            ul {
                list-style-type: none;
                padding-left: 0; 
            }
            .table {    
                margin-bottom: 0px;
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
    constructor(private httpService: HttpService) { };

    ngOnInit() {
        this.isWaiting = true;
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