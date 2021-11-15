import { Component, OnInit } from '@angular/core';
import { Location } from '../shared/models/location.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  form = new FormGroup({
    locationName: new FormControl(''),
  });
  error: string | null = null;
  locations: Location[] = [];
  chosenLocation: Location | undefined = undefined;
  radioSelected: string | undefined = undefined;

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  locationFormSubmit() {
    this.locationService
      .searchLocation(this.form.value.locationName)
      .subscribe({
        next: (data) => {
          if (!!data) {
            this.locations = data;
          }
        },
        error: (error) => {
          if ((error.status = 404)) {
            this.error = 'Location with given name was not found.';
          }
        },
      });
  }

  getSelecteditem() {
    this.chosenLocation = this.locations.find(
      (location) => location.longDescription === this.radioSelected
    );
  }

  onItemChange(location: Location) {
    this.getSelecteditem();
  }

  onAddLocation() {
    this.locationService
      .createLocation(this.chosenLocation)
      .subscribe((data: any) => {
        if (data !== null) {
          this.router.navigate(['/weather']);
        }
      });
  }
}
