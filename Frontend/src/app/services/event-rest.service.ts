import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from '../models/event';

const endpoint = 'http://localhost:3000/api/v1/events';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EventRestService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(endpoint);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(endpoint + '/' + id);
  }

  getImageUrl(id: string): Observable<Blob> {
    return this.http.get(endpoint + '/image/' + id, { responseType: 'blob' });
  }

  getEventsByLocal(id: string): Observable<Event[]> {
    return this.http.get<Event[]>(endpoint + '/byLocal/' + id);
  }

  updateCount(eventId: string, ticketsBought: any) {
    return this.http.put<any>(
      endpoint + '/updateEventTicketCount/' + eventId,
      ticketsBought
    );
  }

  getEventName(eventID: string): Observable<string> {
    return this.http.get<string>(endpoint + '/name/' + eventID);
  }
}

/*
  O Blob (Binary Large Object) é um objeto JavaScript que representa 
  dados binários brutos. 
  Ele pode conter qualquer tipo de dados, como imagens, arquivos de vídeo, 
  áudio, entre outros.
*/
