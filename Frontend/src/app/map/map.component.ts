import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() latitudeTmp!: number; // Guarda a entrada da latitude
  @Input() longitudeTmp!: number; // Guarda a entrada da longitude

  map!: L.Map;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([this.latitudeTmp, this.longitudeTmp], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 20,
    }).addTo(this.map);

    L.marker([this.latitudeTmp, this.longitudeTmp]).addTo(this.map).openPopup();

    // Desabilitar o zoom usando a rolagem do rato
    this.map.scrollWheelZoom.disable();
    // this.map.scrollWheelZoom.enable();
  }
}
