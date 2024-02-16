import { Component, Input, OnInit } from '@angular/core';
import { EventRestService } from '../services/event-rest.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-event-name',
  templateUrl: './event-name.component.html',
  styleUrls: ['./event-name.component.css'],
})

export class EventNameComponent implements OnInit {
  @Input() IdEvento!: string;
  @Input() event!: Event; // Propriedade de entrada para o evento

  constructor(private rest: EventRestService) {}

  ngOnInit(): void {
    this.rest.getEvent(this.IdEvento).subscribe((data: Event) => {
      this.event = data; // Guarda o evento correspondente ao ID passado na rota, usando o serviço 'EventRestService
    });
  }
}
