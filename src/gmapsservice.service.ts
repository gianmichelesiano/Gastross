import { Injectable, NgZone } from '@angular/core';
import {Http} from '@angular/http';



@Injectable()
export class GeocodingService{ 
    http:any
    constructor(http: Http) {
        this.http = http
    }

    getCoordinate(indirizzo){
    //let indirizzo = 'via roma 45 Sarno(SA) Italia '
    console.log(indirizzo)
    let urlStrinf = 'https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzo+'&key=AIzaSyAD1ZodtGDUmPIZUI7e_leAERDjh80jNKc'
    return this.http.get(urlStrinf).map(res => res.json())
  }

}