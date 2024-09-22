import { Component, inject, Input } from '@angular/core';
import { iToDo } from '../iToDo';
import { ToDoService } from '../to-do.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css'
})
export class ToDoItemComponent {
  @Input() toDo!: iToDo;
  public toDoService = inject(ToDoService);
  public delete(){
    console.log("delete")
    this.toDoService.delete(this.toDo.id)
  }
}
