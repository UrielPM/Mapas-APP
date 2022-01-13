import { Injectable } from '@angular/core';
import { PlaceResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature [] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation
  }

  constructor( private PlacesApiClient: PlacesApiClient, 
               private MapService: MapService) { 
    this.getUserLocation();
  }


  public async getUserLocation(): Promise<[number, number]> {
    return new Promise(( resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.useLocation = [ coords.longitude, coords.latitude];
        resolve( this.useLocation);
      },
      ( err) => {
        alert(' No se pudo Obtener la Geolocalización')
        console.log(err);
        reject();
        
      }
      );
    })
  }

  getPlacesByQuery( query: string = ''){
    //Todo: evaluar cuando el query es un nulo

    if( query.length === 0 ){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if( !this.useLocation) throw Error('No hay UserLocation');

    this.isLoadingPlaces = true;

    this.PlacesApiClient.get<PlaceResponse>(`/${ query}.json`, {
      params:{
        proximity: this.useLocation.join(',')
      }
    })
             .subscribe( resp => {
               this.isLoadingPlaces = false;
               this.places = resp.features;

               this.MapService.createMarkersFromPlaces( this.places, this.useLocation!);
               
             });

  }

  deletePlaces(){
    this.places = [];
  }
}
