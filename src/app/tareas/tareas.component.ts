import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TareaService } from '../tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  tareas: any[] = [];
  formulario: FormGroup = this.fb.group({
    nombre: [""],
    completado: [false]
  });
  tareaPorEditar: any;

  constructor(
    private tareaService: TareaService,
    private fb: FormBuilder
  ) {}
  //Minuto 47:08
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.tareaService.getAll()
      .subscribe((tareas: any) => {
        console.log('tareas', tareas);
        this.tareas = tareas._embedded.tareas;
      }, error => console.log("Error de lectura.")
      )
  }

  save() {
    const values = this.formulario.value;

    console.log('values', values);

    let request;

    if (this.tareaPorEditar) {
      request = this.tareaService.update(this.tareaPorEditar._links.self.href, values);
    } else {
      request = this.tareaService.create(values);
    }

    request
    .subscribe({
      next: () => {
        this.getAll();
        this.tareaPorEditar = null;
        this.formulario.setValue({
          nombre: '',
          completado: false
        })
      },
      error: () => {
        console.error("Error de inserción");
      }
      });

  }

  delete(tarea: any) {
    const ok = confirm('¿Estás seguro de eliminar la tarea?');

    if(ok){
      this.tareaService.delete(tarea._links.self.href)
      .subscribe({
        next:() => {
          this.getAll();
        },
        error: () => {
          console.error("Error de eliminación")
        }
      });
    }
  }

  edit(tarea: any){
    this.tareaPorEditar = tarea;

    this.formulario.setValue({
      nombre: tarea.nombre,
      completado: tarea.completado
    })
  }
}
