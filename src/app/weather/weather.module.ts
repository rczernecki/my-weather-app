import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { WeatherForecastContainerComponent } from './weather-forecast-container/weather-forecast-container.component';
import { WeatherForecastComponent } from './weather-forecast-container/weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [
    WeatherComponent,
    WeatherForecastContainerComponent,
    WeatherForecastComponent,
  ],
  imports: [CommonModule, WeatherRoutingModule],
  exports: [WeatherComponent],
})
export class WeatherModule {}
