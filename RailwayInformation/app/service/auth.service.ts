import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class AuthService {
    currentUser: User;
    constructor ( private http: Http ) { }

    login (login: string, password: string): Promise<User> {
        let user = {
            login: login.trim(),
            password: password.trim()
        };
        return this.http.post('api/profile/', user)
            .toPromise()
            .then(response => {
                let body = response.json();
                return this.currentUser = body as User;
            });
    }
    checkin (user: User): Promise<User> {
        return this.http.put('api/profile/', user)
            .toPromise()
            .then(response => this.currentUser = user);
    }
    logout (): void {
        this.currentUser = undefined;
    }    
}