import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { ClientesComponent } from './clientes/clientes.component';


@NgModule({
  declarations: [
    MantenimientosComponent,
    ClientesComponent
  ],
  imports: [
    CommonModule,
    MantenimientosRoutingModule
  ]
})
export class MantenimientosModule { }
