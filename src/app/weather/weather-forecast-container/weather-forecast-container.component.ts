import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherForecast } from 'src/app/shared/models/weather.forecast';

@Component({
  selector: 'app-weather-forecast-container',
  templateUrl: './weather-forecast-container.component.html',
  styleUrls: ['./weather-forecast-container.component.css'],
})
export class WeatherForecastContainerComponent implements OnInit {
  @Input() weatherForecastTable: WeatherForecast[] = [];
  @Input() deletionMode: boolean = false;
  @Output() locationDeleted: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDeleteLocation(event: any) {
    this.locationDeleted.emit(event);
  }
}
