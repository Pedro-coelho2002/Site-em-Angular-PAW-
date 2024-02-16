import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Local } from '../models/local';

const endpoint = 'http://localhost:3000/api/v1/locals';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LocalRestService {
  constructor(private http: HttpClient) {}

  getLocals(): Observable<Local[]> {
    return this.http.get<Local[]>(endpoint);
  }

  getLocal(id: string): Observable<Local> {
    return this.http.get<Local>(endpoint + '/' + id);
  }

  getImageUrl(id: string): Observable<Blob> {
    return this.http.get(endpoint + '/image/' + id, { responseType: 'blob' });
  }
}
