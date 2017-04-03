import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TripComponent } from './trip.component';
import { HomeComponent } from './home.component';
import { BookCarriageComponent } from './book-carriage.component';
import { SearchResultComponent } from './search-result.component';

import { HttpService } from './service/http.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchResultComponent },
    { path: 'search/bookcarriage/:trainNumber', component: BookCarriageComponent }    
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
        SearchResultComponent
    ],
    providers: [ HttpService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }