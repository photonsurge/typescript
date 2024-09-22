import { Component, inject } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { iToDo } from '../iToDo';
import { ToDoItemComponent } from '../to-do-item/to-do-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [CommonModule,ToDoItemComponent],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  toDoService = inject(ToDoService);
  public list:iToDo[] = [];
  constructor(){
    this.list = this.toDoService.getAll();
  }
}
