import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AuthService } from './auth.service';

import { Trip } from '../models/trip';
import { Carriage } from '../models/carriage';
import { Ticket } from '../models/ticket';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService{
    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

    getTrips(from: string, to: string, time: string): Promise<[Trip]>{
        return this.http.get(`/api/trip?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&` +
                `time=${encodeURIComponent(time)}`, { headers: this.authService.getAuthorizationHeader() })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    getSeats(tripId: number, from: number, to: number): Promise<[Carriage]> {
        return this.http.get(`/api/carriage?tripId=${tripId}&from=${from}&to=${to}`,
                { headers: this.authService.getAuthorizationHeader() })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    bookCarriage(tripId: number, from: number, to: number, carriageId: number, userName: string, docId: string): Promise<[Carriage]> {
        let obj = {
            tripId: tripId,
            fromId: from,
            toId: to,
            carriageId: carriageId,
            userName: userName,
            docId: docId
        }        
        return this.http.post('/api/carriage', obj, { headers: this.authService.getAuthorizationHeader() })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    getTickets(): Promise<Ticket[]> {
        return this.http.get('/api/ticket', { headers: this.authService.getAuthorizationHeader() })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }
}
