import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { LicenciasForm } from 'src/app/shared/formsModels/licenciasForms';
import { Licencia } from 'src/app/shared/models/licencia';
import { ChoferService } from 'src/app/shared/services/chofer.service';
import { LicenciaService } from 'src/app/shared/services/licencia.service';

@Component({
  selector: 'app-admin-licencias',
  templateUrl: './admin-licencias.component.html',
  styleUrls: ['./admin-licencias.component.scss'],
})
export class AdminLicenciasComponent {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource();

  constructor(
    public licenciaForm: LicenciasForm,
    private mensajeria: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { licencia: Licencia },
    private srvLicencia: LicenciaService,
    private srvChoferes: ChoferService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminLicenciasComponent>
  ) {}

  ngOnInit() {
    this.cargarlista();
  }

  /*agregarLicencia(dato: Licencia): void {
    alert(
      'Haz selecionado la licencia ' +
        dato.id +
        ' La cual es de tipo ' +
        dato.nombre
    );
  }*/

  seleccionarLicencia(licencia: Licencia) {
    this.dialogRef.close(licencia);
    this.mensajeria.success('SE GUARDO CORRECTAMENTE', 'Éxito', {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      toastClass: 'toast-success', // Aplicar clase personalizada
    });
    //console.log(licencia.nombre);
  }

  cargarlista() {
    this.srvLicencia.getAll().subscribe(
      (datos) => {
        // console.log(datos);
        this.dataSource.data = datos;
      },
      (error) => {
        this.mensajeria.error(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
