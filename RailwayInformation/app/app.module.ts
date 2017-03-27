import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TripComponent } from './trip.component';

import { TripService } from './service/trip.service';

@NgModule({
        imports: [BrowserModule, FormsModule],
        declarations: [
            AppComponent,
            TripComponent
        ],        
        providers: [ TripService ],
        bootstrap: [ AppComponent ]
})

export class AppModule { }