import { Component, Input } from '@angular/core';
import * as moment from 'moment'; // Biblioteca para manipular datas e horários no código Angular

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
})
export class DateTimeComponent {
  @Input() dateTime!: Date; // Propriedade de entrada para a data e hora no formato Date
  formattedDate!: string; // Propriedade para armazenar a data formatada
  formattedTime!: string; // Propriedade para armazenar a hora formatado

  ngOnChanges() {
    if (this.dateTime) {
      const momentDateTime = moment(this.dateTime); // Cria uma instância do moment usando a data e hora fornecidas
      this.formattedDate = momentDateTime.format('DD-MM-YYYY'); // Formata a data no formato DD-MM-YYYY
      this.formattedTime = momentDateTime.format('HH:mm'); // Formata a hora no formato HH:mm
    }
  }
}
