import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  declarations: [LocationComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LocationModule {}
