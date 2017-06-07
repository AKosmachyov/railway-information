import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Trip } from '../models/trip';
import { HttpService } from '../service/http.service';

@Component({
    selector: 'search-result',
    template: `
            <span><b>{{from}} &#8212; {{to}}</b></span>
            <div *ngIf="items.length > 0" class="search-field">
                <table class="table table-hover" *ngIf = "items.length > 0">
                    <thead>
                        <tr>
                            <th>Поезд</th>
                            <th>Отправление</th>
                            <th>Прибытие</th>
                            <th>Время в пути</th>
                            <th>Тип вагона</th>
                            <th>Стоимость (б.р.)</th>
                            <th>Своб. мест</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="trip-component" *ngFor="let item of items" [trip]="item" (click)="sendDataForCarriage(item)"></tr>
                    </tbody>
                </table>
            </div>
            <img *ngIf="isWaiting" src="/public/images/spinner.gif">
            <div *ngIf="dispalayError" class="alert alert-warning" role="alert">По данному маршруту и дате отправления поездов не найдено</div>
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
                border-color: #ddd;
                border-width: 1px;
                border-radius: 4px 4px 0 0;
                border-style: solid;    
            }
            span b {
                padding-left: 15px;
                font-size: 23px;
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
export class SearchResultComponent {
    items: Trip[] = [];
    from: string;
    to: string;
    time: string;
    isWaiting: boolean = false;
    dispalayError: boolean = false;
    private sub: Subscription;
    constructor(
        private httpService: HttpService,
        private activateRoute: ActivatedRoute,
        private router: Router
    ) { };
    ngOnInit() {
        this.sub = this.activateRoute
            .queryParams
            .subscribe(params => {
                this.from = params['from'] || '';
                this.to = params['to'] || '';
                this.time = params['time'];            
                this.get(this.from, this.to, this.time);
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    get(from: string, to: string, time: string) {
        this.isWaiting = true;
        this.httpService.getTrips(from, to, time).then((arr) => {
            this.items = arr;
            this.isWaiting = false;
            if (arr.length > 0)
                return;
            this.dispalayError = true;
        }, () => {
            this.isWaiting = false;
            this.dispalayError = true;
        })
    }
    sendDataForCarriage(item: Trip) {
        this.router.navigate(['/search/bookcarriage'], {
            queryParams: {
                tripId: item.tripId,
                from: item.from.station.id,
                to: item.to.station.id
            }
        })
    }
}