import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuarios } from 'src/app/shared/models/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido1',
    'apellido2',
    'rol',
    'acciones',
  ];
  dataSource = new MatTableDataSource();
  constructor(private srvUsuarios: UsuariosService, public dialog: MatDialog) {}
  ngOnInit() {
    this.srvUsuarios.getAll().subscribe((datos) => {
      this.dataSource.data = datos;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(cedula: number): void {
    this.srvUsuarios.eliminar(cedula).subscribe(
      (dato) => {
        alert('El usuario fue eliminado exitosamente');
        window.location.reload();
      },
      (error) => {
        alert('Error al eliminar usuario, intenta denuevo');
      }
    );
  }

  detalle(dato: Usuarios): void {
    const mensaje = `El nombre del usuario es: ${dato.nombre} ${dato.apellido1} ${dato.apellido2}\nEl rol del usuario es: ${dato.rol}
    \nLa cedula del usuario es: ${dato.cedula}`;
    alert(mensaje);
  }

  abrirDialog(usuario?: Usuarios): void {
    if (usuario) {
      this.dialog.open(AdminUsuariosComponent, {
        width: '600px',
        height: '600px',
        data: { usuario },
      });
    } else {
      this.dialog.open(AdminUsuariosComponent, {
        width: '600px',
        height: '600px',
      });
    }
  }
}
