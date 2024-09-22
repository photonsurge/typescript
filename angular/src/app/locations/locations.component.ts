import { Component, inject } from '@angular/core';
import { IHouseingLocation } from '../ihouseing-location';
import { HousingService } from '../housing.service';
import { CommonModule } from '@angular/common';
import { HouseingLocationComponent } from '../houseing-location/houseing-location.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, HouseingLocationComponent, RouterLink],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  public housingLocationList:IHouseingLocation[] = [];

  housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
