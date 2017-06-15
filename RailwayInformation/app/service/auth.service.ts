import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class AuthService {
    currentUser: User;
    constructor(private http: Http) {
        this.currentUser = this.restoreCredentialFromLS();
    }

    login(email: string, password: string): Promise<number> {
        let body = new URLSearchParams();
        body.set('grant_type', 'password');
        body.set('userName', email);
        body.set('password', password);

        const self = this;
        return this.http.post('/token', body)
            .toPromise()
            .then(response => {
                let user = new User();                
                user.email = email;
                user.token = response.json().access_token;
                self.currentUser = user;
                self.setCredentialForLS(user);
                return response.status;
            });
    }

    checkin(user: User): Promise<number> {
        return this.http.post('api/Account/Register', user)
            .toPromise()
            .then(response => response.status);
    }

    logout (): void {
        this.currentUser = undefined;
    }

    getAuthorizationHeader() {
        if (this.currentUser && this.currentUser.token)
            return new Headers({ 'Authorization': `Bearer ${this.currentUser.token}` });
        return null;
    }

    setCredentialForLS(user: User) {
        let ls = window.localStorage;
        ls.setItem("token", user.token);
        ls.setItem("email", user.email);
    }

    restoreCredentialFromLS(): User {
        let user: User = new User();
        let ls = window.localStorage;

        user.token = ls.getItem("token");
        user.email = ls.getItem("email");
        if (!user.token || !user.email) {
            this.deleteCredential();
            return null;
        }
        return user;
    }

    deleteCredential(): void {
        this.currentUser = null;
        window.localStorage.clear();
    }
}