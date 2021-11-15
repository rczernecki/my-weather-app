import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Location } from '../shared/models/location.model';
import { AuthenticationService } from '../core/authentication.service';
import { WeatherForecast } from '../shared/models/weather.forecast';
import { DailyForecast } from '../shared/models/daily.forecast';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locations_base_url = 'http://localhost:3000/locations';

  locations = new Subject<Location[] | null>();
  locationCreated = new Subject<Boolean>();
  locationDeleted = new Subject<Boolean>();
  weatherForecast = new Subject<WeatherForecast>();

  weekday: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  searchLocation(locationName: string) {
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.authService.getUser()?.user_token
    );
    const url = `${this.locations_base_url}/${locationName}`;
    return this.http.get<Location[]>(url, { headers: headers }).pipe(
      map((data: any) =>
        data.map((input: any) => {
          const location: Location = {
            id: null,
            name: input.name,
            country: input.country,
            state: input.state ? input.state : null,
            lat: input.lat,
            lon: input.lon,
            shortDescription:
              `${input.name}, ` +
              `${input.country}` +
              (input.state ? `, ${input.state}` : ''),
            longDescription:
              `${input.name}, ` +
              `${input.country}` +
              (input.state ? `, ${input.state}` : '') +
              ` ${Math.abs(input.lat)}` +
              (input.lat < 0 ? `S` : `N`) +
              ` ${Math.abs(input.lon)}` +
              (input.lon < 0 ? `W` : `E`),
          };
          return location;
        })
      ),
      tap((data) => {
        this.locations.next(data);
      })
    );
  }

  createLocation(location: Location | undefined) {
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.authService.getUser()?.user_token
    );
    return this.http
      .post<any>(this.locations_base_url, location, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          if (data !== null) {
            this.locationCreated.next(true);
          }
        })
      );
  }

  getWeatherForecast() {
    let headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.authService.getUser()?.user_token
    );
    return this.http
      .get<any>(this.locations_base_url, {
        headers: headers,
      })
      .pipe(
        map((data: any) =>
          data.map((input: any) => {
            const inputLocation = input.location;
            const location: Location = {
              id: inputLocation.id,
              name: inputLocation.name,
              country: inputLocation.country,
              state: inputLocation.state,
              lat: inputLocation.lat,
              lon: inputLocation.lon,
              shortDescription:
                `${inputLocation.name}, ` +
                `${inputLocation.country}` +
                (inputLocation.state ? `, ${inputLocation.state}` : ''),
              longDescription:
                `${inputLocation.name}, ` +
                `${inputLocation.country}` +
                (inputLocation.state ? `, ${inputLocation.state}` : '') +
                ` ${Math.abs(inputLocation.lat)}` +
                (inputLocation.lat < 0 ? `S` : `N`) +
                ` ${Math.abs(inputLocation.lon)}` +
                (inputLocation.lon < 0 ? `W` : `E`),
            };
            const inputDailyForecastArray = input.weather.daily;
            const dailyForecastArray: DailyForecast[] = [];
            inputDailyForecastArray.forEach((element: any) => {
              const dailyForecast: DailyForecast = {
                dayOfWeek: this.weekday[new Date(element.dt * 1000).getDay()],
                date: new Date(element.dt * 1000).toISOString().slice(0, 10),
                temp: {
                  day: element.temp.day,
                  min: element.temp.min,
                  max: element.temp.max,
                  night: element.temp.night,
                  eve: element.temp.eve,
                  morn: element.temp.morn,
                },
                feelsLike: {
                  day: element.feels_like.day,
                  night: element.feels_like.night,
                  eve: element.feels_like.eve,
                  morn: element.feels_like.morn,
                },
                pressure: element.pressure,
                humidity: element.humidity,
                windSpeed: element.wind_speed,
              };
              dailyForecastArray.push(dailyForecast);
            });
            const weatherForecast: WeatherForecast = {
              location: location,
              weather: dailyForecastArray,
            };
            return weatherForecast;
          })
        ),
        tap((data) => {
          if (data !== null) {
            this.weatherForecast.next(data);
          }
        })
      );
  }

  deleteLocation(locationId: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.authService.getUser()?.user_token
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this.http
      .delete<any>(`${this.locations_base_url}/${locationId}`, requestOptions)
      .pipe(
        tap({
          next: () => {
            this.locationDeleted.next(true);
          },
        })
      );
  }
}
