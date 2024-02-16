import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthRestServiceService } from '../services/auth-rest-service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn!: boolean;
  isCartVisible: boolean = false;
  isProfileMenuVisible = false;

  private unsubscribe$ = new Subject<void>();
  user_id!: string;
  constructor(
    public cartService: CartService,
    private authService: AuthRestServiceService
  ) {
    this.authService
      .getLoginStateSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }
  ngOnInit() {
    this.user_id = this.getUser();
    this.authService
      .getLoginStateSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  logout(): void {
    this.authService.logout();
  }

  toggleCartVisibility(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  toggleProfileMenuVisibility() {
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }
  isAuthenticated(): boolean {
    const storedValue = localStorage.getItem('currentUser');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue && parsedValue.auth === true;
    }
    return false;
  }

  getUser(): string {
    const storedValue = localStorage.getItem('currentUser');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue.id;
    }
    return 'Erro';
  }

  getUserbyid() {
    this.authService.getUser(this.user_id);
  }
}
