import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Ticket[] = [];
  private visible: boolean = false;

  constructor() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  addToCart(ticket: Ticket) {
    this.cartItems.push(ticket);
    // Atualiza o localStorage com os itens do carrinho
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    console.log(ticket);
  }

  removeFromCart(ticket: Ticket) {
    const index = this.cartItems.indexOf(ticket);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      // Atualiza o localStorage com os itens do carrinho
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  
  updateCart(ticket: Ticket){
    const index = this.cartItems.indexOf(ticket);
    if (index > -1) {
      this.removeFromCart(ticket);
      this.addToCart(ticket);
      this.cartItems[index] = ticket;
    }
  }


  // Limpa o carrinho
  clearCart(): void {
    this.cartItems = [];
    // Remove os itens do carrinho do localStorage
    localStorage.removeItem('cartItems');
  }

  getCartItems(): Ticket[] {
    return this.cartItems;
  }

  toggleCartVisibility(): boolean {
    this.visible = !this.visible;
    return this.visible;
  }

  isCartVisible(): boolean {
    return this.visible;
  }

  setCartVisible(option: boolean) {
    this.visible = option;
  }
}
