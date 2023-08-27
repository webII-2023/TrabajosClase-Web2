import { ProductosForm } from 'src/app/shared/services/formModels/productosForm';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss'],
})
export class AdminProductosComponent {
  titulo = 'Crear Producto';
  constructor(
    public productoForm: ProductosForm,
    private srvProductos: ProductosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    if (this.data?.producto) {
      this.titulo = 'Modificar Producto';
    } else {
      this.titulo = 'Crear Producto';
    }
  }
  cargarDatosForm() {
    this.productoForm.baseForm.patchValue({
      id: this.data.producto.id,
      nombre: this.data.producto.nombre,
      precio: this.data.producto.precio,

      stock: this.data.producto.stock,

      fechsIngreso: this.data.producto.fechsIngreso,
      estado: true,
    });
  }

  guardar(): void {
    if (this.productoForm.baseForm.valid) {
      this.srvProductos.guardar(this.productoForm.baseForm.value).subscribe(
        (dato) => {
          alert('Se guardo correctamente');
        },
        (error) => {
          alert('Error al guardar');
        }
      );
    }
  }
}
