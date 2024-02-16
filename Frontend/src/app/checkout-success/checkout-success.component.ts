import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { CartService } from '../services/cart.service';
import { EventRestService } from '../services/event-rest.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css'],
})
export class CheckoutSuccessComponent implements OnInit {
  event!: Event;

  countInfantilTmp: number = 0;
  countJuvenilTmp: number = 0;
  countAdultoTmp: number = 0;
  countSeniorTmp: number = 0;

  constructor(
    private eventService: EventRestService,
    private ticketService: TicketService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    console.log('Carrinho ao mandar: ', this.cartService.getCartItems());
    // Parte para atualização dos contadores na base de dados
    const cartItens = this.cartService.getCartItems();

    for (let i = 0; i < cartItens.length; i++) {
      var idEvento = cartItens[i].eventId;
      this.ticketType(cartItens[i].ticketType, cartItens[i].quantity);

      var update = {
        countInfantil: this.countInfantilTmp,
        countJuvenil: this.countJuvenilTmp,
        countAdulto: this.countAdultoTmp,
        countSenior: this.countSeniorTmp,
      };

      this.eventService.updateCount(idEvento, update).subscribe(
        (response) => {
          console.log(
            'Contagem de ingressos atualizada com sucesso:',
            response
          );
        },
        (error) => {
          console.error('Erro ao atualizar a contagem de ingressos:', error);
        }
      );
      this.setZeroCount();
    }

    // Parte de inserir bilhetes na base de dados
    this.ticketService.postTickets(this.cartService.getCartItems()).subscribe(
      (response) => {
        console.log('Response: ', response);
        this.cartService.clearCart();
      },
      (error) => {
        console.error('ERROR success: ', error);
        this.cartService.clearCart();
      }
    );
  }

  ticketType(type: string, quantidade: number): void {
    switch (type) {
      case 'Infantil':
        this.countInfantilTmp = quantidade;
        console.log(this.countInfantilTmp);
        console.log('O contador INFANTIL foi ATUALIZADO');
        break;
      case 'Juvenil':
        this.countJuvenilTmp = quantidade;
        console.log('O contador JUVENIL foi ATUALIZADO');
        break;
      case 'Adulto':
        this.countAdultoTmp = quantidade;
        console.log('O contador ADULTO foi ATUALIZADO');
        break;
      case 'Sénior':
        this.countSeniorTmp = quantidade;
        console.log('O contador SENIOR foi ATUALIZADO');
        break;
    }
  }

  setZeroCount(): void {
    this.countInfantilTmp = 0;
    this.countJuvenilTmp = 0;
    this.countAdultoTmp = 0;
    this.countSeniorTmp = 0;
  }
}
