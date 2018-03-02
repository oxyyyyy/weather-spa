import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { WeatherService } from './services/weather.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WeeklyWeatherComponent } from './components/weekly-weather/weekly-weather.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    WeeklyWeatherComponent,
    HomePageComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
