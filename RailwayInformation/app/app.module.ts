import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app.component';
import { TripComponent } from './components/trip.component';
import { HomeComponent } from './components/home.component';
import { BookCarriageComponent } from './components/book-carriage.component';
import { SearchResultComponent } from './components/search-result.component';
import { CheckinComponent } from './components/checkin.component';
import { LoginComponent } from './components/login.component';

import { HttpService } from './service/http.service';
import { AuthService } from './service/auth.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchResultComponent },
    { path: 'search/bookcarriage', component: BookCarriageComponent },
    { path: 'checkin', component: CheckinComponent },
    { path: 'login', component: LoginComponent },
    { path: '*', component: HomeComponent }   
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    declarations: [
        AppComponent,
        TripComponent,
        HomeComponent,
        BookCarriageComponent,
        SearchResultComponent,
        CheckinComponent,
        LoginComponent
    ],
    providers: [
        HttpService,
        AuthService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }