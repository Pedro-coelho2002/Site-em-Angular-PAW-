import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  postTickets(tickets: Ticket[]) :  Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/v1/tickets/add', tickets)
  }

  getTicketsByUser(id: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('http://localhost:3000/api/v1/tickets/' + id);
  }
}
