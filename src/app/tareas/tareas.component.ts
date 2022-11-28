import { Component, OnInit } from '@angular/core';
import { TareaService } from '../tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
tareas: any[] = [];

constructor(  private tareaService: TareaService) {}
//Minuto 47:08
ngOnInit(): void {
  this.tareaService.getAll()
  .subscribe(tareas => {
    console.log('tareas', tareas);
  })
}
}
