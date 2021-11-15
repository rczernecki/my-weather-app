import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DailyForecast } from 'src/app/shared/models/daily.forecast';
import { WeatherForecast } from 'src/app/shared/models/weather.forecast';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit {
  @Input() weatherForecast: WeatherForecast | undefined;
  @Input() deletionMode: boolean = false;
  @Output() locationDeleted: EventEmitter<any> = new EventEmitter();
  chosenDay: DailyForecast | undefined;

  constructor() {}

  ngOnInit(): void {
    this.chosenDay = this.weatherForecast?.weather[0];
  }

  onDeleteLocation() {
    this.locationDeleted.emit(this.weatherForecast?.location.id);
  }

  onDayChosen(i: number) {
    this.chosenDay = this.weatherForecast!.weather[i];
  }
}
