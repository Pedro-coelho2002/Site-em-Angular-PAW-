import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthRestServiceService } from '../services/auth-rest-service.service';
import { TicketService } from '../services/ticket.service';
import { EventRestService } from '../services/event-rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Input() user!: User; // Propriedade de entrada para o evento
  user_id!: string;
  tickets: any = [];

  constructor(
    private authService: AuthRestServiceService,
    private ticketrest: TicketService,
    private eventService: EventRestService
  ) {}

  ngOnInit() {
    this.user_id = this.getUser();
    this.authService.getUser(this.user_id).subscribe((data: User) => {
      this.user = data;
    });
    this.getTicketsByUser();
  }

  getUser(): string {
    const storedValue = localStorage.getItem('currentUser');
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue.id;
    }
    return 'Erro';
  }

  getTicketsByUser() {
    this.tickets = [];
    this.ticketrest.getTicketsByUser(this.user_id).subscribe((data: {}) => {
      console.log(data);
      this.tickets = data;
    });
  }
}
