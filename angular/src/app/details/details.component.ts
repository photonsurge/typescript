import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { IHouseingLocation } from '../ihouseing-location';
import { CommonModule } from '@angular/common';
import { DetailsFormComponent } from '../details-form/details-form.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, DetailsFormComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation?: IHouseingLocation;
  housingLocationId = -1;
  constructor() {
    if (this.route.snapshot) {
      this.housingLocationId = Number(this.route.snapshot.params['id']);
      this.housingLocation = this.housingService.getHousingLocationById(this.housingLocationId);
    }

  }

}
