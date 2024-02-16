import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthRestServiceService } from '../services/auth-rest-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = [];
  isLoggedIn: boolean = false;
  userNIF: number = 0;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthRestServiceService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCartItems();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  isAuthenticated(): boolean {
    const storedValue = localStorage.getItem('currentUser');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue && parsedValue.auth === true;
    }
    return false;
  }
}
