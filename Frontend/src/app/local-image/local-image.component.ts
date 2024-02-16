import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalRestService } from '../services/local-rest.service';

@Component({
  selector: 'app-local-image',
  templateUrl: './local-image.component.html',
  styleUrls: ['./local-image.component.css'],
})
export class LocalImageComponent {
  @Input() localId!: string; // Armazena o ID do local
  imageUrl!: string | ArrayBuffer | null; // Armazena o url da imagem

  constructor(
    private route: ActivatedRoute,
    private imageService: LocalRestService
  ) {}

  ngOnInit() {
    this.getImageUrl();
  }

  /**
   * Obtem a imagem do local com o ID armazenado
   */
  getImageUrl() {
    this.imageService.getImageUrl(this.localId).subscribe(
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
