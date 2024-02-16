import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventRestService } from '../services/event-rest.service';

@Component({
  selector: 'app-event-image',
  templateUrl: './event-image.component.html',
  styleUrls: ['./event-image.component.css'],
})
export class EventImageComponent implements OnInit {
  @Input() eventId!: string; // Armazena o ID do evento
  imageUrl!: string | ArrayBuffer | null; // Armazena o url da imagem

  constructor(
    private route: ActivatedRoute,
    private imageService: EventRestService
  ) {}

  ngOnInit() {
    this.getImageUrl();
  }

  /**
   * Obtem a imagem do evento com o ID armazenado
   */
  getImageUrl() {
    this.imageService.getImageUrl(this.eventId).subscribe(
      (image: Blob) => {
        this.createImageUrl(image);
      },
      (error) => {
        console.log('Erro ao obter a imagem:', error);
      }
    );
  }

  /**
   * Cria o URL da imagem, a partir do que recebe do servico
   * @param image
   */
  createImageUrl(image: Blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(image);
  }
}
