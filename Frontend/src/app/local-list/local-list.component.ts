import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from '../models/local';
import { LocalRestService } from '../services/local-rest.service';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css'],
})
export class LocalListComponent implements OnInit {
  locals: any = []; // Guarda todos os locais

  constructor(
    private rest: LocalRestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLocals();
  }

  /**
   * Obter todos os locais através do service 'LocalRestService'
   */
  getLocals() {
    this.locals = [];
    this.rest.getLocals().subscribe((data: {}) => {
      console.log(data);
      this.locals = data;
    });
  }

  /**
   * Consulta o local
   * @param id ID do local
   */
  viewLocal(id: string) {
    this.router.navigate(['/local/view/' + id]);
  }
}
