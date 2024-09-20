import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IHouseingLocation } from '../ihouseing-location';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-houseing-location',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './houseing-location.component.html',
  styleUrl: './houseing-location.component.css'
})
export class HouseingLocationComponent {
  @Input() housingLocation!: IHouseingLocation;
}
