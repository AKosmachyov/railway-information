import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TripComponent } from './trip.component';

import { HttpService } from './service/http.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        TripComponent
    ],
    providers: [ HttpService ],
    bootstrap: [AppComponent]
})

export class AppModule { }