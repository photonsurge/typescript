import { Component, inject, Input } from '@angular/core';
import { iToDo } from '../iToDo';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css'
})
export class ToDoItemComponent {
  @Input() toDo!: iToDo;
  toDoService = inject(ToDoService);
  delete(){
    this.toDoService.delete(this.toDo.id)
  }
}
