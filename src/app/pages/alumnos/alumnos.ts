import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './alumnos.html',
})
export class Alumnos {
  alumnos: { nombre: string; apellido: string; curso: string }[] = [];

  formulario: FormGroup;
  modoEdicion = false;
  indiceEditando: number | null = null;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      curso: ['', Validators.required]
    });
  }

  agregar(): void {
    if (this.formulario.invalid) return;

    const alumno = this.formulario.value;

    if (this.modoEdicion && this.indiceEditando !== null) {
      this.alumnos[this.indiceEditando] = alumno;
      this.alumnos = [...this.alumnos]; // Forzar actualización
      this.modoEdicion = false;
      this.indiceEditando = null;
    } else {
      this.alumnos = [...this.alumnos, alumno];
    }

    this.formulario.reset();
  }

  editar(index: number): void {
    const alumno = this.alumnos[index];
    this.formulario.patchValue(alumno);
    this.modoEdicion = true;
    this.indiceEditando = index;
  }

  eliminar(index: number): void {
    this.alumnos.splice(index, 1);
    this.alumnos = [...this.alumnos]; // Actualizar vista
    this.cancelar();
  }

  cancelar(): void {
    this.formulario.reset();
    this.modoEdicion = false;
    this.indiceEditando = null;
  }
}
