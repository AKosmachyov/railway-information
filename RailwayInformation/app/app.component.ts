import { Component, OnInit } from '@angular/core';
import { TripService } from './service/trip.service';
import { Trip } from './models/trip';

@Component({
        selector: 'my-app',
        template: `
            <div class="top">
                <div class="header">
                    <div class="col-md-2">
                        Информаторий ЖД
                    </div>
                <div class="col-md-8">
                    Откуда
                    <input type="text" id="from">
                    Куда
                    <input type="text" id="to">
                    Когда
                    <input type="date">
                    <button class="btn">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="col-md-2 navbar-right-panel">
                    <a class="btn btn-default" href="#" role="button">Вход</a>
                    <a class="btn btn-default" href="#" role="button">Регистрация</a>
                </div>
            </div>
        </div>
        <div class="main-part">
            <span><b>Минск &#8212; Брест</b></span>
            <div class="search-result">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Поезд</th>
                            <th>Отправление</th>
                            <th>Прибытие</th>
                            <th>Время в пути</th>
                            <th>Тип вагона</th>
                            <th>Стоимость (б.р.)</th>
                            <th>Своб. места</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="trip"></tr>                        
                    <!-- 2 -->
                    <tr>
                        <td>
                            649Б
                            Могилев &#8212; Брест
                        </td>
                        <td>
                            06:13
                            <p></p>
                                Минск
                            
                        </td>
                        <td>
                            10:32
                            <p></p>
                            Брест
                            
                        <td>4 ч 19 мин</td>
                        <td>
                            <ul>
                                <li>Купе</li>
                                <li>Плацкартный</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>7,72 руб</li>
                                <li>19,91 руб.</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>18</li>
                                <li>20</li>
                            </ul>
                        </td>
                    </tr>
                    <!-- 3 -->
                    <tr>
                        <td>
                            009ЯЩ
                            Москва &#8212; Варшава
                        </td>
                        <td>
                            00:01
                            <p></p>
                                Минск
                        </td>
                        <td>
                            03:28
                            <p></p>
                                Брест
                        <td>3 ч 27 мин</td>
                        <td>
                            <ul>
                                <li>Купе</li>
                                <li>Плацкартный</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>8 руб</li>
                                <li>19,91 руб.</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>213</li>
                                <li>4</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            }
            .navbar-right-panel a {
                margin-left: 5px;
            }
            .main-part {
                padding-top: 70px;
                padding-left: 32px;   
                padding-right: 32px;
            }
            ul {
                list-style-type: none;
                padding-left: 0; 
            }
            .table {    
                margin-bottom: 0px;
            }            
            .search-result {
                border-color: #ddd;
                border-width: 1px;
                border-radius: 4px 4px 0 0;
                border-style: solid;    
            }
            span b {
                font-size: 23px;
            }
            .main-part span {
                display: block;
                margin-bottom: 5px;
                margin-left: 15px;
            }
        `]
})
export class AppComponent implements OnInit{
    items: Trip[] = [];
    constructor(private tripService: TripService) { }
    
    ngOnInit(){
        this.items = this.tripService.getData();
        console.log(this.items);
    }
}