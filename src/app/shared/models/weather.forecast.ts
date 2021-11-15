import { DailyForecast } from './daily.forecast';
import { Location } from './location.model';

export interface WeatherForecast {
  location: Location;
  weather: DailyForecast[];
}
