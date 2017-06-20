import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TicketService } from '../service/ticket.service';
import { HttpService } from '../service/http.service';

@Component({
    selector: 'payment',
    template: `
        <div class="col-sm-offset-3 col-sm-6 col-xs-12">
            <div *ngIf="!displayError">
                <div class="card well">
                    <div class="form-group card-number">
                        <label>Номер карты</label>
                        <input class="form-control" [(ngModel)]="cardNumber" [ngClass]="{dirty: carNumberErr}" maxLength="16"/>
                    </div>
                    <div class="form-inline card-center">
                        <div class="form-group">
                            <label>Срок действия</label>
                            <input class="form-control" placeholder="ММ" [(ngModel)]="month" [ngClass]="{dirty: monthErr}" maxLength="2">
                            <label>/</label>
                            <input class="form-control" placeholder="ГГ" [(ngModel)]="year" [ngClass]="{dirty: yearErr}" maxLength="2">
                        </div>
                        <div class="form-group cvv">
                            <label for="exampleInputEmail2">CVV</label>
                            <input class="form-control" [(ngModel)]="cvv" placeholder="000" [ngClass]="{dirty: cvvErr}" maxLength="3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Имя Фамилия держателя карты</label>
                        <input class="form-control" [(ngModel)]="fio" [ngClass]="{dirty: fioErr}"/>
                    </div>
                </div>
                <div>
                    <span>К оплате: {{price}} руб</span>
                </div>
                <div class="form-inline button-menu">
                    <button class="btn btn-default" (click)="close()">Отменить</button>
                    <button class="btn btn-default" (click)="buy()">Оплатить</button>
                </div>
            </div>
            <div *ngIf="displayError" class="alert alert-danger">
                Произошла ошибка
                <a (click)="close()">вернуться назад</a>
            </div>
        </div>
        `,
    styles: [`
        .card-center > .form-group input {
            width: 50px;
        }
        .alert {
            margin-top: 15px;
        }
        a {
            cursor: pointer
        }
        .card {
            padding: 15px 36px;
            border-radius: 8px;
        }        
        .card-number input {
            text-align: center;
            font-size: 21px;
        }
        .card + div {
            text-align: center;
            font-size: 17px; 
        }
        .card > div {
            margin-bottom: 15px;
        }
        .cvv {
            float: right;
        }
        .button-menu {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
        }
        .dirty {
            border-color: #a94442;
        }
    `]
})
export class PaymentComponent implements OnInit {
    price: number;
    cardNumber: string;
    carNumberErr: boolean = false;
    month: string;
    monthErr: boolean = false;
    cvv: string;
    cvvErr: boolean = false;
    year: string;
    yearErr: boolean = false;
    fio: string;
    fioErr: boolean = false;

    displayError: boolean = false;
    constructor(
        private ticketService: TicketService,
        private location: Location,
        private httpService: HttpService,
        private router: Router
    ) { }

    ngOnInit() {
        if (!this.ticketService.currentTicket) {
            this.location.back();
            return;
        }
        this.price = this.ticketService.currentTicket.price;
    }
    //var inputs = $(':input').keypress(function (e) {
    //    if (e.which == 13) {
    //        e.preventDefault();
    //        var nextInput = inputs.get(inputs.index(this) + 1);
    //        if (nextInput) {
    //            nextInput.focus();
    //        }
    //    }
    //});

    buy() {
        if (!this.checkCard())
            return;
        let ticket = this.ticketService.currentTicket;
        this.httpService.bookCarriage(ticket.tripId, ticket.fromId, ticket.toId,
            ticket.carriageId, ticket.userName, ticket.docId)
            .then((data) => {
                this.ticketService.deleteTicket();
                this.router.navigate(['/profile']);
            })
            .catch(() => this.displayError = true);
    }

    private checkCard() {
        let flag = true;
        let cardNumber = parseInt(this.cardNumber);
        let month = parseInt(this.month);
        let year = parseInt(this.year);
        let cvv = parseInt(this.cvv);
        if (isNaN(cardNumber) || cardNumber.toString().length < 15) {
            this.carNumberErr = true;
            flag = false;
        } else {
            this.carNumberErr = false;
        }
        if (!this.fio || this.fio.length == 0) {
            this.fioErr = true;
            flag = false;
        } else {
            this.fioErr = false;
        }
        if (isNaN(month) || month < 1 || month > 12) {
            this.monthErr = true;
            flag = false;
        } else {
            this.monthErr = false;
        }            
        if (isNaN(year) || year < 16) {
            this.yearErr = true;
            flag = false;
        } else {
            this.yearErr = false;
        }
        if (isNaN(cvv) || cvv.toString().length < 2) {
            this.cvvErr = true;
            flag = false;
        } else {
            this.cvvErr = false;
        }
        return flag;
    }

    close() {
        this.location.back();
    }
}