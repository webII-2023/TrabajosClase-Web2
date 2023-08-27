import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    MantenimientosComponent,
    ClientesComponent,
    ProductosComponent,
  ],
  imports: [CommonModule, MantenimientosRoutingModule, MaterialModule],
})
export class MantenimientosModule {}
