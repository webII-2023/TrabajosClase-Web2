import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UsuariosForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(2),
        ],
      ],
      apellido1: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(2),
        ],
      ],
      apellido2: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(2),
        ],
      ],
      fecha_ingreso: [Date.now, [Validators.required]],
      correo: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(12),
        ],
      ],
      rol: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      estado: [true],

      //fechaIngreso: ['', [Validators.required]],
      // nombre: ['', [Validators.required, Validators.minLength(20)]],
    });
  }
}
