import { Component, inject } from '@angular/core';
import { HouseingLocationComponent } from '../houseing-location/houseing-location.component';
import { CommonModule,  } from '@angular/common';
import { IHouseingLocation } from '../ihouseing-location';
import { HousingService } from '../housing.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HouseingLocationComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  public housingLocationList:IHouseingLocation[] = [];

  housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
