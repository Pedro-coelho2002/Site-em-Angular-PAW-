import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../models/event';
import { EventRestService } from '../services/event-rest.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: any = []; // Armazena todos os eventos
  eventNameSearch: string = '';

  constructor(
    private rest: EventRestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  /**
   * Obter todos os eventos atraves do service 'EventRestService'
   */
  getEvents() {
    this.events = [];
    this.rest.getEvents().subscribe((data: {}) => {
      console.log(data);
      this.events = data;
      if (this.events.length === 0) {
        this.router.navigate(['/maintenance']);
      }
    });
  }

  /**
   * Consulta o evento
   * @param id ID do evento
   */
  viewEvent(id: string) {
    this.router.navigate(['/event/view/' + id]);
  }

  /**
   * Filtar os eventos pelo que é passado na barra de pesquisa
   * @returns Eventos com correspondência
   */
  filtrarEventos(): any[] {
    if (!this.eventNameSearch || this.eventNameSearch.trim() === '') {
      return this.events;
    }

    const termo = this.eventNameSearch.toLowerCase();
    return this.events.filter(
      (event: any) =>
        event.name.toLowerCase().includes(termo) ||
        event.description.toLowerCase().includes(termo)
    );
  }
}
