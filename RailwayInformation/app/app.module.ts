import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { TripComponent } from './trip.component';

import { HttpService } from './service/http.service';

const appRoutes: Routes = [
    { path: '', component: AppComponent },
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
        TripComponent
    ],
    providers: [ HttpService ],
    bootstrap: [AppComponent]
})

export class AppModule { }