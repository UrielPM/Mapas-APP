import { Component } from '@angular/core';
import { PlacesService, MapService} from '../../services';
import { Feature } from '../../interfaces/places';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent  {

  public selectedId: string = '';

  constructor( private PlacesService: PlacesService,
                private MapService: MapService) { }

  get isLoadingPlaces(): boolean{
    return this.PlacesService.isLoadingPlaces;

  }

  get places(): Feature [] {
    return this.PlacesService.places;
  }

  flyTo( place: Feature){
    this.selectedId = place.id;
    const [lng, lat ] = place.center;
    this.MapService.flyTo([ lng, lat]);

  }

  getDirections( place: Feature){

    if( !this.PlacesService.useLocation) throw Error('No hay UserLocation')

    this.PlacesService.deletePlaces();


    const start = this.PlacesService.useLocation;
    const end = place.center as [number, number];

      this.MapService.getRouteBetweenPoints( start, end)

  }
}
