import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../services/auth-rest-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name!: string;
  address!: string;
  password!: string;
  contact!: number;
  email!: string;
  nif!: number;

  constructor(
    private router: Router,
    private authServive: AuthRestServiceService
  ) {
    this.name;
    this.address;
    this.password;
    this.contact;
    this.email;
    this.nif;
  }

  ngOnInit(): void {}

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  register(): void {
    if (!this.isValidEmail(this.email)) {
      alert('Insira um email válido!');
      return;
    }
    if (this.password === '') {
      alert('Insira uma password!');
      return;
    }
    this.authServive
      .register(
        this.name,
        this.address,
        this.password,
        this.contact,
        this.email,
        this.nif
      )
      .subscribe((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/']);
        } else {
          alert('Erro no login!');
        }
      });
  }
}
