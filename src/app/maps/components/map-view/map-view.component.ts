import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesService } from '../../services';
import { MapService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor( private PlacesService: PlacesService,
               private MapService: MapService  ) { }




ngAfterViewInit(): void {
  if( !this.PlacesService.useLocation) throw Error ('No hay PlacesServices.userLocation');

  const map = new Map({
    container:this.mapDivElement.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: this.PlacesService.useLocation,
    zoom: 14
    });

    const popup = new Popup()
    .setHTML(`
    <h6>Aquí estoy </h6>
    <span> Estoy en este lugar del mundo </span>
    `);

  new Marker({color: 'red'})
    .setLngLat( this.PlacesService.useLocation)
    .setPopup( popup)
    .addTo( map)

    this.MapService.setMap( map);
    
}

}
 