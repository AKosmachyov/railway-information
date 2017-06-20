import { Injectable } from '@angular/core';

@Injectable()
export class TicketService {
    currentTicket: any;

    setTicket(ticket: any) {
        this.currentTicket = ticket;
    }

    deleteTicket() {
        this.currentTicket = undefined;
    }
}