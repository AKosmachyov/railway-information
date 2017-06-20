import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { HttpService } from '../service/http.service';
import { Carriage } from '../models/carriage';
import { Ticket } from '../models/ticket';

import { AuthService } from '../service/auth.service';
import { TicketService } from '../service/ticket.service';

@Component({
    selector: 'book-carriage',
    template: `
        <div *ngIf="carriage.length > 0">      
            <span *ngIf="!val">Выберите вагон</span>
            <span *ngIf="val">Вы выбрали: {{val}} вагон</span>
            <div class="search-field">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Вагон</th>
                            <th>Тип вагона</th>
                            <th>Своб. мест</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of carriage" (click)="setCarriage(item)">
                            <td>{{item.number}}</td>
                            <td>{{item.carriageType}}</td>
                            <td>{{item.emptySeats}}</td>
                            <td>{{item.price}} руб</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div *ngIf="displayUserBox" class = "userInformation">
                <label for="surname">ФИО</label>                
                <input type="text" [(ngModel)]="userName" class="form-control" required/>

                <label for="passportNumber"> № проездного документа</label>                
                <input type="text" [(ngModel)]="docId" class="form-control" required/>

                <label>Ваш вагон: <label *ngIf="!val">не выбран</label>{{val}}</label>
                <label>К оплате: <label *ngIf="!val">не выбран вагон</label>{{price}} <label *ngIf="val">руб</label></label>
                <button (click)="buy()" [disabled]="docId.length==0 || userName.length==0" class = "btn btn-default">Оплатить</button>
            </div>
            <div *ngIf="!displayUserBox">
                <div class="alert alert-warning" role="alert">Вы должны авторизироваться
                    <a target="_blank" href="/#/login">Войти</a>
                    <a target="_blank" href="/#/checkin">Регистрация</a>
                </div>
            </div>
        </div>
        <img *ngIf="isWaiting" src="/public/images/spinner.gif">
        <div *ngIf="displayError" class="alert alert-warning" role="alert">{{errMessage}}</div>
        `,
    styles: [`
            .userInformation {
                 display: flex;
                 flex-direction: column;
                 align-items: center;             
            }
            .search-field {
                border-color: #ddd;
                border-width: 1px;
                border-radius: 4px 4px 0px 0px;
                border-style: solid;
                min-width: 365px;
            }
            table {
                margin-bottom: 0px;
            }
            input {
                width:365px;
            }
            span {
                display:row;
            }
            img {
                position: absolute;
                top: 50%;
                left: 50%;
                height: 100px;
                text-align: center;
            }
            .alert {
                margin-top: 10px;
            }
        `]
})
export class BookCarriageComponent {
    tripId: number;
    val: number;
    price: number;
    carriageId: number;
    carriage: Carriage[] = [];
    fromId: number;
    toId: number;
    userName: string = "";
    docId: string = "";  
    private sub: Subscription;

    errMessage: string;
    displayError: boolean = false;
    isWaiting: boolean = false;
    displayUserBox: boolean = false;
    constructor(
        private activateRoute: ActivatedRoute,
        private httpService: HttpService,
        private router: Router,
        private authService: AuthService,
        private ticketService: TicketService
    ) {
        this.displayUserBox = !!this.authService.currentUser;
    }
    setCarriage(item: Carriage) {
        this.val = item.number;
        this.price = item.price;
        this.carriageId = item.id;
    }
    buy() {
        let ticket = {
            tripId: this.tripId,
            fromId: this.fromId,
            toId: this.toId,
            carriageId: this.carriageId,
            userName: this.userName,
            docId: this.docId,
            price: this.price
        }
        this.ticketService.setTicket(ticket);
        this.router.navigate(['/payment']);
    }
    ngOnInit() {
        this.sub = this.activateRoute
            .queryParams
            .subscribe(params => {
                this.tripId = params['tripId'] || null;
                this.fromId = params['from'] || null;
                this.toId = params['to'] || null;
                if (!this.tripId || !this.fromId || !this.toId)
                    return;
                this.isWaiting = true;
                this.httpService.getSeats(this.tripId, this.fromId, this.toId).then((arr) => {
                    this.carriage = arr;
                    this.isWaiting = false;
                    if (arr.length > 0)
                        this.setCarriage(arr[0]);
                }, () => {
                    this.errMessage = "Данный поезд не найден";
                    this.displayError = true;
                    this.isWaiting = false;
                })
            });
    }
        
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}