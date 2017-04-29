import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpService } from './service/http.service';
import { Carriage } from './models/carriage';

@Component({
    selector: 'book-carriage',
    template: `
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
                <div class = "userInformation">
                    Фамилия
                    <input type="text" [(ngModel)]="surname"/>
                    Имя                   
                    <input type="text" [(ngModel)]="name"/>
                    № проездного документа
                    <input type="text"/>
                    <span>Ваш вагон: <span *ngIf="!val">не выбран</span>{{val}}</span>
                    <span>К оплате: <span *ngIf="!val">не выбран вагон</span>{{price}} <span *ngIf="val">руб</span></span>
                    <a (click)="buy()" class = "btn btn-default">Оплатить</a>
                </div>
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
            }
            table {
                margin-bottom: 0px;
            }
            input {
                width:400px;
            }
            span {
                display:row;
            }
        `]
})
export class BookCarriageComponent {
    tripId: number;
    val: number;
    price: number;
    carriage: Carriage[];
    fromId: number;
    toId: number;
    surname: string;
    name: string
    private sub: Subscription;
    constructor(
        private activateRoute: ActivatedRoute,
        private httpService: HttpService,
        private router: Router
    ) { }
    setCarriage(item: Carriage) {
        this.val = item.number;
        this.price = item.price;
    }
    buy() {
        let name = encodeURIComponent(this.surname + ' ' + this.name);
        //let trainNumber = encodeURIComponent(this.trainNumber);
        //document.location.replace(`http://localhost:3000/ticket.html?name=${name}&trainNumber=${trainNumber}&from=${this.fromId}&to=${this.toId}&carriage=${this.val}`);
    }
    ngOnInit() {
        this.sub = this.activateRoute
            .queryParams
            .subscribe(params => {
                this.tripId = params['tripId'] || 0;
                this.fromId = params['from'] || '';
                this.toId = params['to'] || '';
                this.httpService.getSeats(this.tripId, this.fromId, this.toId).then((arr) => {
                    this.carriage = arr;
                })
            });
    }
        
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}