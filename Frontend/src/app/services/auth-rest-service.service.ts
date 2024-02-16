import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

const endpoint = 'http://localhost:3000/api/v1/auth';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthRestServiceService {
  private LoggedIn: boolean;
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.LoggedIn = false;
  }

  login(email: string, password: string): Observable<AuthRestModelResponse> {
    this.LoggedIn = true;
    this.isLoggedInSubject.next(true);
    return this.http.post<AuthRestModelResponse>(
      endpoint + '/login',
      new LoginModel(email, password)
    );
  }

  logout() {
    this.LoggedIn = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartItems');
    this.isLoggedInSubject.next(false);
  }

  register(
    name: string,
    address: string,
    password: string,
    contact: number,
    email: string,
    nif: number
  ): Observable<AuthRestModelResponse> {
    this.LoggedIn = true;
    this.isLoggedInSubject.next(true);
    return this.http.post<any>(
      'http://localhost:3000/api/v1/auth/register',
      new RegisterModel(name, address, password, contact, email, nif)
    );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getLoginStateSubject(): BehaviorSubject<boolean> {
    return this.isLoggedInSubject;
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpoint + '/' + id);
  }
}

export interface AuthRestModelResponse {}

export class LoginModel {
  constructor(public email: string, public password: string) {}
}

export class RegisterModel {
  constructor(
    public name: string,
    public address: string,
    public password: string,
    public contact: Number,
    public email: string,
    public nif: Number
  ) {}
}
