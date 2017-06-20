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
                        <input class="form-control" maxLength="16"/>
                    </div>
                    <div class="form-inline card-center">
                        <div class="form-group">
                            <label>Срок действия</label>
                            <input class="form-control" placeholder="ММ" maxLength="2">
                            <label>/</label>
                            <input class="form-control" placeholder="ГГ" maxLength="2">
                        </div>
                        <div class="form-group cvv">
                            <label for="exampleInputEmail2">CVV</label>
                            <input class="form-control" placeholder="000" maxLength="3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Имя Фамилия держателя карты</label>
                        <input class="form-control" />
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
    `]
})
export class PaymentComponent implements OnInit {
    price: number;
    currentInputId: number;
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
        let ticket = this.ticketService.currentTicket;
        this.httpService.bookCarriage(ticket.tripId, ticket.fromId, ticket.toId,
                ticket.carriageId, ticket.userName, ticket.docId)
            .then((data) => {
                this.ticketService.deleteTicket();
                this.router.navigate(['/profile']);
            })
            .catch(() => this.displayError = true);
    }

    close() {
        this.location.back();
    }
}