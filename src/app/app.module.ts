import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { LocationModule } from './location/location.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { SignupModule } from './signup/signup.module';
import { WeatherModule } from './weather/weather.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    LocationModule,
    LoginModule,
    WeatherModule,
    SharedModule,
    SignupModule,
    SettingsModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
