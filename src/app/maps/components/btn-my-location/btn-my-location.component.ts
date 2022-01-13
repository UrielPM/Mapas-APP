import { Component } from '@angular/core';
import { MapService } from '../../services';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(  private PlacesService: PlacesService,
                private MapService: MapService) { }

  goToMyLocation(){

    if( !this.PlacesService.isUserLocationReady) throw Error('No hay Ubicacion del usuario');
    if( !this.MapService.isMapReady) throw Error('No se ha inicializado el mapa');


    this.MapService.flyTo(this.PlacesService.useLocation!);
    
  }
}
