import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoferesRoutingModule } from './choferes-routing.module';
import { ChoferesComponent } from './choferes.component';
import { MaterialModule } from 'src/app/material.module';
import { AdminLicenciasComponent } from './admin-licencias/admin-licencias.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChoferesComponent, AdminLicenciasComponent],
  imports: [
    CommonModule,
    ChoferesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ChoferesModule {}
