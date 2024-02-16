import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../models/event';
import { EventRestService } from '../services/event-rest.service';
import { AuthRestServiceService } from '../services/auth-rest-service.service';
import { CartService } from '../services/cart.service';
import { Ticket } from '../models/ticket';
import { User } from '../models/User';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  @Input() event!: Event; // Propriedade de entrada para o evento
  showAddToCartMessage: boolean = false;

  @Input() countInfantil!: number;
  @Input() countJuvenil!: number;
  @Input() countAdulto!: number;
  @Input() countSenior!: number;
  @Input() user!: User; // Propriedade de entrada para o evento

  ticketsAvailableCount!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: EventRestService,
    private cartService: CartService,
    private authService: AuthRestServiceService
  ) {}

  ngOnInit(): void {
    var idTmp = this.route.snapshot.params['id']; // Obtem o parâmetro ID da rota
    this.rest.getEvent(idTmp).subscribe((data: Event) => {
      this.event = data; // Guarda o evento correspondente ao ID passado na rota, usando o serviço 'EventRestService'
      this.ticketsAvailableCount = this.event.maxTickets - this.sellTickets();
    });

    this.authService.getUser(this.getUser()).subscribe((data: User) => {
      this.user = data;
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

  /**
   * Consultar o local
   * @param idTmp Id do local
   */
  getLocal(idTmp: string): void {
    this.router.navigate(['/local/view/' + idTmp]);
  }

  /**
   * Adicionar evento ao carrinho
   */
  addToCart(): void {
    this.cartService.setCartVisible(true);

    if (this.countInfantil > 0) {
      console.log('Infantil');

      var ticket: Ticket = {
        userId: this.user._id,
        eventId: this.event._id,
        userNIF: this.user.nif,
        eventName: this.event.name,
        ticketType: 'Infantil',
        promo: 0,
        quantity: this.countInfantil,
        price: this.event.priceInfantil,
      };

      this.cartService.addToCart(ticket);
    }

    if (this.countJuvenil > 0) {
      console.log('Juvenil');

      var ticket: Ticket = {
        userId: this.user._id,
        eventId: this.event._id,
        userNIF: this.user.nif,
        eventName: this.event.name,
        ticketType: 'Juvenil',
        promo: 0,
        quantity: this.countJuvenil,
        price: this.event.priceJuvenil,
      };

      this.cartService.addToCart(ticket);
    }

    if (this.countAdulto > 0) {
      console.log('Adulto');

      var ticket: Ticket = {
        userId: this.user._id,
        eventId: this.event._id,
        userNIF: this.user.nif,
        eventName: this.event.name,
        ticketType: 'Adulto',
        promo: 0,
        quantity: this.countAdulto,
        price: this.event.priceAdulto,
      };

      this.cartService.addToCart(ticket);
    }

    if (this.countSenior > 0) {
      console.log('Sénior');

      var ticket: Ticket = {
        userId: this.user._id,
        eventId: this.event._id,
        userNIF: this.user.nif,
        eventName: this.event.name,
        ticketType: 'Sénior',
        promo: 0,
        quantity: this.countSenior,
        price: this.event.priceSenior,
      };

      this.cartService.addToCart(ticket);
    }

    // Exibir a mensagem de aviso
    this.showAddToCartMessage = true;

    // Reiniciar a propriedade após um tempo (opcionalmente)
    setTimeout(() => {
      this.showAddToCartMessage = false;
    }, 3000); // Define o tempo em milissegundos (3 segundos no exemplo)

    this.countInfantil = 0;
    this.countJuvenil = 0;
    this.countAdulto = 0;
    this.countSenior = 0;
  }

  isTicketsAvailable(): boolean {
    return (
      this.event.maxTickets -
        this.event.countInfantil -
        this.event.countJuvenil -
        this.event.countAdulto -
        this.event.countSenior >
      0
    );
  }

  // Bilhetes já vendidos neste evento
  sellTickets(): number {
    return (
      this.event.countInfantil +
      this.event.countJuvenil +
      this.event.countAdulto +
      this.event.countSenior
    );
  }

  validateInput() {
    var ticketsAvailable = document.getElementById('ticketsAvailable');

    const ticketSell = this.sellTickets();

    // Trata os valores como zero se forem undefined ou null
    var countInfantilTMP = this.countInfantil || 0;
    var countJuvenilTMP = this.countJuvenil || 0;
    var countAdultoTMP = this.countAdulto || 0;
    var countSeniorTMP = this.countSenior || 0;

    // Recalcula o número de bilhetes disponíveis, e guarda na variável ticketsAvailableCount
    this.ticketsAvailableCount =
      this.event.maxTickets -
      ticketSell -
      countInfantilTMP -
      countJuvenilTMP -
      countAdultoTMP -
      countSeniorTMP;

    if (ticketsAvailable !== null) {
      ticketsAvailable.innerHTML =
        '<strong>Disponíveis: </strong>' +
        this.ticketsAvailableCount +
        ' Bilhete(s)';
    }
  }
}
