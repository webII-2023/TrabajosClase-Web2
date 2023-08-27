import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ChoferesForm } from 'src/app/shared/formsModels/choferesForms';
import { AdminLicenciasComponent } from './admin-licencias/admin-licencias.component';
import { ChoferService } from 'src/app/shared/services/chofer.service';
import { Choferes } from 'src/app/shared/models/chofer';
import { Licencia } from 'src/app/shared/models/licencia';
//import { Licencia } from 'src/app/shared/models/licencia';
//import { ChoferService } from 'src/app/shared/services/chofer.service';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss'],
})
export class ChoferesComponent {
  licenciasSeleccionadas: Licencia[] = []; // Array para almacenar las licencias seleccionadas
  dataSource = new MatTableDataSource();

  isCreate = true;
  constructor(
    public choferesForm: ChoferesForm,
    public dialog: MatDialog,
    private mensajeria: ToastrService,
    private srvChoferes: ChoferService,
    private cdr: ChangeDetectorRef
  ) {}

  agregarLicenciaSeleccionada(licencia: Licencia) {
    this.licenciasSeleccionadas.push(licencia);
    console.log('Agregando licencia:', licencia);
    this.dataSource.data = this.licenciasSeleccionadas; // Actualiza la fuente de datos
    console.log('Licencias seleccionadas:', this.licenciasSeleccionadas);
    this.cdr.detectChanges();
  }

  abrirDialog(Choferes?: Choferes): void {
    let dialogRef: MatDialogRef<AdminLicenciasComponent>; // Define dialogRef aquí

    if (Choferes) {
      dialogRef = this.dialog.open(AdminLicenciasComponent, {
        width: '300px',
        height: '300px',
        data: { Choferes },
        position: { right: '0' },
      });
    } else {
      dialogRef = this.dialog.open(AdminLicenciasComponent, {
        width: '400px',
        height: '350px',
        position: { right: '0' },
      });
    }

    dialogRef.afterClosed().subscribe((licencia: Licencia) => {
      if (licencia) {
        this.agregarLicenciaSeleccionada(licencia);
        this.cdr.detectChanges();
      }
    });
  }

  guardar() {
    if (this.choferesForm.baseForm.valid) {
      if (this.isCreate) {
        this.srvChoferes.guardar(this.choferesForm.baseForm.value).subscribe(
          (dato) => {
            this.choferesForm.baseForm.reset();
            this.mensajeria.success('SE GUARDO CORRECTAMENTE');
          },
          (error) => {
            this.mensajeria.error(`Se produjo un error. ${error}`);
          }
        );
      }
    }
  }
  eliminarLicencia(licencia: Licencia) {
    const index = this.licenciasSeleccionadas.indexOf(licencia);
    if (index >= 0) {
      this.licenciasSeleccionadas.splice(index, 1); // Elimina la licencia del array
      this.dataSource.data = this.licenciasSeleccionadas; // Actualiza la fuente de datos de la tabla
      this.cdr.detectChanges(); // Detecta cambios
    }
  }
}
