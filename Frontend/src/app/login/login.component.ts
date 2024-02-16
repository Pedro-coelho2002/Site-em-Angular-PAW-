import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../services/auth-rest-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthRestServiceService
  ) {
    this.email = '';
    this.password = '';
  }

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  ngOnInit(): void {}

  login(): void {
    if (!this.isValidEmail(this.email)) {
      alert('Insira um email válido!');
      return;
    }
    if (this.password === '') {
      alert('Insira uma senha!');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Obter o cargo do usuário do localStorage
          const currentUserString = localStorage.getItem('currentUser');
          const currentUser = currentUserString
            ? JSON.parse(currentUserString)
            : null;
          const cargo = currentUser?.cargo ?? '';

          if (cargo === 'ADMIN') {
            window.location.href = 'http://localhost:3000';
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      (error) => {
        alert('Credenciais erradas!');
      }
    );
  }
}
