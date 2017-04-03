import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { TripComponent } from './trip.component';
import { HomeComponent } from './home.component';
import { BookCarriageComponent } from './book-carriage.component';

import { HttpService } from './service/http.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'bookcarriage/:trainNumber', component: BookCarriageComponent }    
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        TripComponent,
        HomeComponent,
        BookCarriageComponent
    ],
    providers: [ HttpService ],
    bootstrap: [AppComponent]
})

export class AppModule { }