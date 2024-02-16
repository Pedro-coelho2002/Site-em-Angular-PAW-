import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from '../models/local';
import { LocalRestService } from '../services/local-rest.service';
import { EventRestService } from '../services/event-rest.service';

@Component({
  selector: 'app-local-details',
  templateUrl: './local-details.component.html',
  styleUrls: ['./local-details.component.css'],
})
export class LocalDetailsComponent implements OnInit {
  @Input() local!: Local; // Guardar a entrada do local
  events: any = []; // Guarda os eventos relacionados com o local
  idLocalTmp = this.route.snapshot.params['id']; // Guarda o ID do local

  constructor(
    private router: Router,
    private eventRest: EventRestService,
    private route: ActivatedRoute,
    private rest: LocalRestService
  ) {}

  ngOnInit(): void {
    this.rest.getLocal(this.idLocalTmp).subscribe((data: Local) => {
      this.local = data;
    });
    this.getEventsByLocal();
  }

  /**
   * Obter todos os eventos, do local,  atraves do service 'EventRestService'
   */
  getEventsByLocal() {
    this.events = [];
    this.eventRest.getEventsByLocal(this.idLocalTmp).subscribe((data: {}) => {
      console.log(data);
      this.events = data;
    });
  }

  /**
   * Consultar todos os locais
   */
  backToLocals(): void {
    this.router.navigate(['/locals']);
  }

  /**
   * Consultar todos os eventos
   */
  backToEvents(): void {
    this.router.navigate(['/events']);
  }

  /**
   * Consultar um evento
   * @param id ID do evento
   */
  viewEvent(id: string) {
    this.router.navigate(['/event/view/' + id]);
  }
}
