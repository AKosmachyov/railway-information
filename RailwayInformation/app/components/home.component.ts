import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Trip } from '../models/trip';
import { Station } from '../models/station';
import { HttpService } from '../service/http.service';

@Component({
    selector: 'home',
    template: `
            <div class="col-md-offset-2 col-md-8 col-xs-12">
                <h1>Поиск</h1>
                <div class="search-panel">Откуда
                    <input ngui-auto-complete [(ngModel)]="from" id="from"
                            [source]="observableSource.bind(this)" 
                            list-formatter="name" />
                    Куда
                    <input ngui-auto-complete [(ngModel)]="to" id="to"
                            [source]="observableSource.bind(this)" 
                            list-formatter="name" />
                    Когда
                    <input type="date" [(ngModel)]="time">
                    <button class="btn" (click)="get()">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                </div>
                <h1>С нами вы можете: </h1>
                <div class="form-info">
                    <div class="form-group">
                        <label class="col-sm-5 control-label">Покупать билеты</label>
                        <div class="col-sm-5">
                            <img class="img-circle" src="public/images/buy.png"/>
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-5 control-label">Просматривать расписание</label>
                        <div class="col-sm-5">
                            <img class="img-circle" src="public/images/info.png"/>  
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-5 control-label">Экономить время</label>
                        <div class="col-sm-5">
                            <img  class="img-circle" src="public/images/safeTime.png"/>
                        </div>
                      </div>
                <div>
            </div>
    `,
    styles: [`
            input[type="date"] {                
                padding: 5px 12px;
            }
            input {
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 6px 12px;
            }
            input + button {
                background-color: transparent;
                font-size: 17px;
                color: #aeb7bf;
                outline: none;    
            }
            .search-panel {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            h1 {
                text-align: center;
            }
            .form-info {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .form-info img {
                width: 79px;
            }
            .form-info .form-group {
                display: flex;
                align-items: center;
            }
    `]
})
export class HomeComponent {
    from: string;
    to: string;
    time: Date;
    constructor(
        private router: Router,
        private http: HttpService
    ) { };
    get() {
        if (!this.from || !this.to || !this.time)
            return;
        this.router.navigate(['/search'], {
            queryParams: {
                from: this.from,
                to: this.to,
                time: this.time
            }
        })
    }
    observableSource = (keyword: any): Observable<Station[]> => {
        let strTrim = keyword.trim();
        if (strTrim && keyword) {
            return this.http.getStationAutoComplete(keyword)
        } else {
            return Observable.of([]);
        }
    }
}