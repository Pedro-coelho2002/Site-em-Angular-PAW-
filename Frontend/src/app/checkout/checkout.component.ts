import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthRestServiceService } from '../services/auth-rest-service.service';
import { loadStripe } from '@stripe/stripe-js';
import { Ticket } from '../models/ticket';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  finalPrice: number = 0;
  ticketsPrice: number = 0;

  cart: any = [];
  availableDiscounts: any[] = [];
  selectedDiscount: number = 1;

  //User logado
  @Input() user!: User;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router,
    private authService: AuthRestServiceService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCartItems();
    this.calculateTotalPrice();

    this.authService.getUser(this.getUser()).subscribe((data: User) => {
      this.user = data;

      // Determine the available discounts based on user's points
      console.log('Points: ', this.user);
      if (this.user.points >= 100) {
        this.availableDiscounts = [
          { value: '0', label: 'Sem desconto' },
          { value: '0.1', label: '10% de desconto - 30pts' },
          { value: '0.25', label: '25% de desconto - 60pts' },
          { value: '0.4', label: '40% de desconto - 100pts' },
        ];
      } else if (this.user.points >= 60) {
        this.availableDiscounts = [
          { value: '0', label: 'Sem desconto' },
          { value: '0.1', label: '10% de desconto - 30pts' },
          { value: '0.25', label: '25% de desconto - 60pts' },
        ];
      } else if (this.user.points >= 30) {
        this.availableDiscounts = [
          { value: '0', label: 'Sem desconto' },
          { value: '0.1', label: '10% de desconto - 30pts' },
        ];
      } else {
        this.availableDiscounts = [
          { value: '0', label: '(Pontos insuficientes)' },
        ];
      }
    });
  }

  getUser(): string {
    const storedValue = localStorage.getItem('currentUser');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue.id;
    }
    return 'Erro';
  }

  onCheckout(): void {
    if (this.finalPrice === 0) {
      this.router.navigate(['/checkout/success']);
    } else {
      //adiconar valor promo nos tickets
      var tickets = this.cartService.getCartItems();
      for (var i = 0; i < tickets.length; i++) {
        tickets[i].promo = this.selectedDiscount;
        tickets[i].price *= this.selectedDiscount;
      }

      console.log(
        'Carrinho antes de mandar: ',
        this.cartService.getCartItems()
      );

      this.http
        .post('http://localhost:3000/checkout', {
          items: this.cartService.getCartItems().map((item: Ticket) => {
            return {
              eventName: item.eventName + ' Bilhete: ' + item.ticketType,
              ticketType: item.ticketType,
              price: item.price,
              quantity: item.quantity,
            };
          }),
        })
        .subscribe(async (res: any) => {
          let stripe = await loadStripe(
            'pk_test_51MtHwMEICoImyemIJIHwS5RfTIf9FSZYkkyEme1KNCHIWDqxqsSzC6Pn4DShP9mcUfq8B77YmfBr8UgUEDwNDKi900zVcm0qCj'
          );
          stripe?.redirectToCheckout({
            sessionId: res.id,
          });
        });
    }
  }

  calculateTotalPrice(): void {
    this.ticketsPrice = this.cart.reduce(
      (total: number, item: Ticket) =>
        total + Number(item.price) * item.quantity,
      0
    );
    this.recalculatePrices();
  }

  recalculatePrices(): void {
    this.finalPrice = this.ticketsPrice * this.selectedDiscount;
    this.finalPrice = parseFloat(this.finalPrice.toFixed(2));
  }

  ngAfterViewInit(): void {
    this.recalculatePrices();
  }

  // Função para receber o desconto selecionado
  onDiscountSelected(event: any) {
    this.selectedDiscount = 1 - Number(event.target.value);
    this.recalculatePrices();
  }

  updateCart(item: Ticket) {
    this.cartService.updateCart(item);
    this.calculateTotalPrice();
  }
}
