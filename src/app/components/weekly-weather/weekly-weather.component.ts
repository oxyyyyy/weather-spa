import { Component, OnInit, Input } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'weekly-weather',
  templateUrl: './weekly-weather.component.html',
  styleUrls: ['./weekly-weather.component.css']
})
export class WeeklyWeatherComponent implements OnInit {

  @Input() city: any;
  @Input() removable: boolean = false;

  loaded: boolean = false;
  forecast: Object = {
    city: '',
    days: [],
  }

  constructor(
    private weather: WeatherService,
  ) { }

  ngOnInit() {
    this.weather.dayly(this.city)
      .subscribe(
        (weather) => {
          this.forecast = {
            city: weather.city.name,
            days: weather.list.reduce((schedule, now) => {
              if (
                !schedule.length ||
                  schedule[schedule.length - 1].hours
                    [schedule[schedule.length - 1].hours.length - 1]
                      .dt_txt.split(' ')[0] !== now.dt_txt.split(' ')[0]
              ) {
                schedule.push({ hours: [now] });
              } else {
                schedule[schedule.length - 1].hours.push(now);
              }
              if (now.dt_txt.split(' ')[1] === '12:00:00' || schedule.length === 1) {
                schedule[schedule.length - 1].date = now.dt_txt.split(' ')[0];
                schedule[schedule.length - 1].temp = now.main.temp;
                schedule[schedule.length - 1].speed = now.wind.speed;
                schedule[schedule.length - 1].degree = now.wind.deg;
                schedule[schedule.length - 1].describtion = now.weather[0].main;
              }
              return schedule;
            }, [])
              .slice(0, 5)
          };
        },
        (error) => {
          this.weather.cities.splice(this.weather.cities.indexOf(this.city), 1);
          localStorage.setItem('cities', JSON.stringify(this.weather.cities));
        },
        () => {
          this.loaded = true;
        }
      )
  }

}
