import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HousingService } from '../housing.service';
import { IHouseingLocation } from '../ihouseing-location';

@Component({
  selector: 'app-details-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details-form.component.html',
  styleUrl: './details-form.component.css'
})
export class DetailsFormComponent {
  @Input() housingLocation!: IHouseingLocation;
  housingService = inject(HousingService);
  applyForm = new FormGroup({
    firstName: new FormControl('',  [Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  submitApplication():void {
    if (this.applyForm.invalid) {
      return;
    }

    this.housingService.submitApplication(
      this.housingLocation.id,
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
