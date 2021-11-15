import { Component, OnInit } from '@angular/core';
import { WeatherForecast } from '../shared/models/weather.forecast';
import { Subscription } from 'rxjs';
import { LocationService } from '../location/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  deletionMode: boolean = false;
  weatherForecastTable: WeatherForecast[] = [];
  subscription: Subscription | undefined;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.locationService
      .getWeatherForecast()
      .subscribe((data: WeatherForecast[]) => {
        if (data !== null) {
          this.weatherForecastTable = data;
        }
      });
  }

  switchDeletionMode(event: any) {
    this.deletionMode = !this.deletionMode;
    event.target.classList.toggle('delete-checked');
  }

  navigateToLocationForm() {
    this.router.navigate([`/location`]);
  }

  onDeleteLocation(event: any) {
    this.locationService.deleteLocation(event).subscribe((data: any) => {
      this.weatherForecastTable = this.weatherForecastTable.filter(
        (wf) => wf.location.id !== event
      );
    });
  }
}
