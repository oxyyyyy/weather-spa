import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  key : string = '429f8b04b3c37d3444f7b0d83a6de7f0';
  cities: {
    name: string,
  }[] = JSON.parse(localStorage.getItem('cities')) || [];

  constructor(
    private http: Http,
  ) {}

  addCity(city: string) {
    this.cities.unshift({ name: city });
    localStorage.setItem('cities', JSON.stringify(this.cities));
  };

  removeCity(city: string) {
    this.cities = this.cities.filter(one => one.name !== city);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  };

  dayly(city: any) {
    if (city.geo) {
      return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.geo.lat}&lon=${city.geo.lng}&APPID=${this.key}`)
        .map(res => res.json())
    }
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&APPID=${this.key}`)
      .map(res => res.json())
  };

  now(city: string) {
    return this.http.get('')
  }
}
