import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './service/http.service';
import { Carriage } from './models/carriage';

@Component({
    selector: 'book-carriage',
    template: `
            Выберите вагон
            <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Вагон</th>
                            <th>Тип вагона</th>                            
                            <th>Места</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let item of carriage" (click)="setCarriage(item)">
                            <td>{{item.name}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.emptySeat}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class = "userInformation">
                    Фамилия
                    <input type="text"/>
                    Имя
                    <input type="text"/>
                    Отчество
                    <input type="text"/>
                    № проездного документа
                    <input type="text"/>
                    Ваш вагон: <span *ngIf="!val">не выбран</span>{{val}}
                </div>
        `,
    styles: [`
            .userInformation {
                 display: flex;
                 flex-direction: column;
                 width: 30%;                
            }
        `]
})
export class BookCarriageComponent {
    trainNumber: string;
    val: string;
    carriage: Carriage[];
    constructor(
        private activateRoute: ActivatedRoute,
        private httpService: HttpService
    ) {
        this.trainNumber = activateRoute.snapshot.params['trainNumber'];
        this.httpService.getSeats(this.trainNumber).then((arr) => {
            this.carriage = arr;                
        })
    }
    setCarriage(item: Carriage) {
        this.val = item.name;
    }
}